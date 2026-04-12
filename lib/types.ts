export type Sponsor = {
  id: string;
  name: string;
  slug: string;
  description: string;
  website_url?: string | null;
  logo_url?: string | null;
  sponsor_type: 'main' | 'player' | 'match' | 'event' | 'pavilion';
  sort_order: number;
  active: boolean;
};

export type PlayerCareerStats = {
  player_id: string;
  batting_total_runs: number;
  batting_total_balls: number;
  batting_total_outs: number;
  batting_average: number | null;
  batting_strike_rate: number | null;
  bowling_total_runs_conceded: number;
  bowling_total_balls: number;
  bowling_total_wickets: number;
  bowling_average: number | null;
  bowling_strike_rate: number | null;
  economy_rate: number | null;
};

export type UpcomingItem = {
  item_type: 'event' | 'fixture';
  id: string;
  item_datetime: string;
  title: string;
  summary_text: string | null;
  competition_code: string | null;
  competition_name: string | null;
  format_label: string | null;
  venue_name: string | null;
  home_team: string | null;
  away_team: string | null;
  link_url: string | null;
};

export type NewsItem = {
  id: string;
  title: string;
  paragraph_1: string | null;
  paragraph_2: string | null;
  paragraph_3: string | null;
  link_url: string | null;
  button_label: string | null;
  published_at: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

export type BattingSeasonStat = {
  id: string;
  player_id: string;
  season_year: number;
  competition_code?: string | null;
  balls?: number | null;
  wkts?: number | null;
  runs?: number | null;
  net_runs?: number | null;
  strike_rate?: number | null;
  balls_per_wkt?: number | null;
  net_strike_rate?: number | null;
};

export type BowlingSeasonStat = {
  id: string;
  player_id: string;
  season_year: number;
  competition_code?: string | null;
  balls?: number | null;
  wkts?: number | null;
  runs?: number | null;
  wides?: number | null;
  nbs?: number | null;
  balls_per_wkt?: number | null;
  runs_per_over?: number | null;
  net_runs_per_over?: number | null;
  extras_per_over?: number | null;
};

export type Player = {
  id: string;
  first_name: string;
  last_name: string;
  display_name: string;
  short_name?: string | null;
  squad_number?: number | null;
  role_label?: string | null;
  batting_style?: string | null;
  bowling_style?: string | null;
  bio?: string | null;
  image_url?: string | null;
  is_active: boolean;
  sort_order: number;
};

export type PlayerWithSponsor = Player & {
  sponsor?: Sponsor | null;
  batting_2026?: BattingSeasonStat | null;
  bowling_2026?: BowlingSeasonStat | null;
  career_stats?: PlayerCareerStats | null;
};

export type FixtureResult = {
  id: string;
  title: string;
  season_year: number;
  competition_code: 'KWSCIL' | 'TIL' | 'KWSCL' | 'KWSB' | 'Tournaments' | 'Friendlies';
  competition_name: string;
  competition_division?: string | null;
  fixture_type: 'fixture' | 'result';
  starts_at: string;
  venue_name?: string | null;
  home_team: string;
  away_team: string;
  home_score?: string | null;
  away_score?: string | null;
  result_summary?: string | null;
  report?: string | null;
  external_link?: string | null;
};

export type PageContent = {
  slug: string;
  title: string | null;
  intro: string | null;
  body: string | null;
  body_2: string | null;
  cta_label: string | null;
  cta_url: string | null;
  image_url: string | null;
  image_alt: string | null;
};

export type PageSection = {
  id?: string;
  page_slug: string;
  section_key: string;
  heading?: string | null;
  body?: string | null;
  image_url?: string | null;
  cta_label?: string | null;
  cta_url?: string | null;
  sort_order: number;
};

export type EventItem = {
  id: string;
  title: string;
  event_date?: string | null;
  summary?: string | null;
  description?: string | null;
  image_url?: string | null;
  status: 'draft' | 'published';
};

export type SiteSettings = {
  clubName: string;
  heroTagline: string;
  heroSubtext: string;
  contactEmail?: string | null;
  contactPhone?: string | null;
};
