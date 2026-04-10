create extension if not exists pgcrypto;

create table if not exists site_settings (
  setting_key text primary key,
  setting_value jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists page_content (
  slug text primary key,
  title text not null,
  intro text,
  body text,
  image_url text,
  cta_label text,
  cta_url text,
  seo_title text,
  seo_description text,
  updated_at timestamptz not null default now()
);

create table if not exists page_sections (
  id uuid primary key default gen_random_uuid(),
  page_slug text not null references page_content(slug) on delete cascade,
  section_key text not null,
  heading text,
  body text,
  image_url text,
  cta_label text,
  cta_url text,
  sort_order integer not null default 100,
  unique(page_slug, section_key)
);

create table if not exists sponsors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text not null default '',
  website_url text,
  logo_url text,
  sponsor_type text not null check (sponsor_type in ('main', 'player', 'match', 'event', 'pavilion')),
  sort_order integer not null default 100,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists players (
  id uuid primary key,
  first_name text not null,
  last_name text not null default '',
  display_name text not null,
  short_name text,
  squad_number integer,
  role_label text,
  batting_style text,
  bowling_style text,
  bio text,
  image_url text,
  is_active boolean not null default true,
  sort_order integer not null default 100,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists player_sponsorships (
  id uuid primary key default gen_random_uuid(),
  player_id uuid not null references players(id) on delete cascade,
  sponsor_id uuid not null references sponsors(id) on delete restrict,
  starts_on date,
  ends_on date,
  notes text,
  created_at timestamptz not null default now(),
  unique(player_id)
);

create table if not exists seasons (
  id uuid primary key default gen_random_uuid(),
  year integer not null unique,
  label text not null,
  active boolean not null default true
);

create table if not exists competitions (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  active boolean not null default true
);

create table if not exists competition_divisions (
  id uuid primary key default gen_random_uuid(),
  competition_id uuid not null references competitions(id) on delete cascade,
  code text not null unique,
  name text not null,
  sort_order integer not null default 100
);

create table if not exists venues (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  address_line_1 text,
  town text,
  county text,
  postcode text,
  active boolean not null default true
);

create table if not exists teams (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  short_name text,
  active boolean not null default true
);

create table if not exists fixtures_results (
  id uuid primary key,
  title text not null,
  season_id uuid not null references seasons(id) on delete restrict,
  competition_id uuid not null references competitions(id) on delete restrict,
  competition_division_id uuid references competition_divisions(id) on delete set null,
  venue_id uuid references venues(id) on delete set null,
  home_team_id uuid not null references teams(id) on delete restrict,
  away_team_id uuid not null references teams(id) on delete restrict,
  fixture_type text not null check (fixture_type in ('fixture', 'result')),
  starts_at timestamptz not null,
  home_score text,
  away_score text,
  result_summary text,
  report text,
  external_link text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists player_batting_stats (
  id uuid primary key,
  player_id uuid not null references players(id) on delete cascade,
  season_id uuid not null references seasons(id) on delete restrict,
  competition_id uuid references competitions(id) on delete set null,
  stat_scope text not null default 'season_total',
  balls integer,
  wickets integer,
  runs integer,
  net_runs integer,
  strike_rate numeric(8,2),
  balls_per_wicket numeric(8,2),
  net_strike_rate numeric(8,2),
  source_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(player_id, season_id, competition_id, stat_scope)
);

create table if not exists player_bowling_stats (
  id uuid primary key,
  player_id uuid not null references players(id) on delete cascade,
  season_id uuid not null references seasons(id) on delete restrict,
  competition_id uuid references competitions(id) on delete set null,
  stat_scope text not null default 'season_total',
  balls integer,
  wickets integer,
  runs integer,
  wides integer,
  no_balls integer,
  balls_per_wicket numeric(8,2),
  runs_per_over numeric(8,2),
  net_runs_per_over numeric(8,2),
  extras_per_over numeric(8,2),
  source_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(player_id, season_id, competition_id, stat_scope)
);

create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique,
  event_date date,
  summary text,
  description text,
  image_url text,
  status text not null default 'draft' check (status in ('draft', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace view fixtures_results_public as
select fr.id, fr.title, s.year as season_year, c.code as competition_code, c.name as competition_name, cd.name as competition_division, fr.fixture_type, fr.starts_at, v.name as venue_name, ht.name as home_team, at.name as away_team, fr.home_score, fr.away_score, fr.result_summary, fr.report, fr.external_link
from fixtures_results fr
join seasons s on s.id = fr.season_id
join competitions c on c.id = fr.competition_id
left join competition_divisions cd on cd.id = fr.competition_division_id
left join venues v on v.id = fr.venue_id
join teams ht on ht.id = fr.home_team_id
join teams at on at.id = fr.away_team_id;

create or replace view player_profiles_public as
select p.id, p.first_name, p.last_name, p.display_name, p.short_name, p.role_label, p.batting_style, p.bowling_style, p.bio, p.image_url, p.is_active, p.sort_order,
       s.id as sponsor_id, s.name as sponsor_name, s.slug as sponsor_slug, s.description as sponsor_description,
       bs.balls as batting_balls, bs.wickets as batting_wickets, bs.runs as batting_runs, bs.net_runs as batting_net_runs, bs.strike_rate as batting_strike_rate,
       bw.balls as bowling_balls, bw.wickets as bowling_wickets, bw.runs as bowling_runs, bw.wides as bowling_wides, bw.no_balls as bowling_no_balls, bw.runs_per_over as bowling_runs_per_over
from players p
left join player_sponsorships ps on ps.player_id = p.id and (ps.ends_on is null or ps.ends_on >= current_date)
left join sponsors s on s.id = ps.sponsor_id
left join seasons s2026 on s2026.year = 2026
left join player_batting_stats bs on bs.player_id = p.id and bs.season_id = s2026.id and bs.competition_id is null and bs.stat_scope = 'season_total'
left join player_bowling_stats bw on bw.player_id = p.id and bw.season_id = s2026.id and bw.competition_id is null and bw.stat_scope = 'season_total';
