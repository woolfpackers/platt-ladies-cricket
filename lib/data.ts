
import { supabase } from './supabase';
import type {
  EventItem,
  FixtureResult,
  NewsItem,
  PageContent,
  PageSection,
  PlayerWithSponsor,
  SiteSettings,
  Sponsor
} from './types';

function requireSupabase() {
  if (!supabase) {
    throw new Error(
      'Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.'
    );
  }
  return supabase;
}

export async function getNewsItems(): Promise<NewsItem[]> {
  const db = requireSupabase();
  const { data, error } = await db
    .from('news_items')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false });

  if (error) {
    throw new Error(`Failed to load news items: ${error.message}`);
  }

  return data ?? [];
}

export async function getPageContent(slug: string): Promise<PageContent | null> {
  const db = requireSupabase();
  const { data, error } = await db
    .from('page_content')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to load page_content for "${slug}": ${error.message}`);
  }

  return data ?? null;
}

export async function getPageSections(pageSlug: string): Promise<PageSection[]> {
  const db = requireSupabase();
  const { data, error } = await db
    .from('page_sections')
    .select('*')
    .eq('page_slug', pageSlug)
    .order('sort_order', { ascending: true });

  if (error) {
    throw new Error(`Failed to load page_sections for "${pageSlug}": ${error.message}`);
  }

  return data ?? [];
}

export async function getNavItems() {
  return [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Tour', href: '/tour' },
    { label: 'Pavilion', href: '/pavilion' },
    { label: 'Events', href: '/events' },
    { label: 'Join Us', href: '/join-us' },
    { label: 'Sponsors', href: '/sponsors' },
  ];
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const db = requireSupabase();
  const { data, error } = await db
    .from('site_settings')
    .select('setting_value')
    .eq('setting_key', 'club_identity')
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to load site settings: ${error.message}`);
  }

  if (!data?.setting_value) {
    throw new Error('No club_identity setting found in site_settings.');
  }

  return data.setting_value as SiteSettings;
}

export async function getSponsors(): Promise<Sponsor[]> {
  const db = requireSupabase();
  const { data, error } = await db
    .from('sponsors')
    .select('*')
    .eq('active', true)
    .order('sort_order', { ascending: true });

  if (error) {
    throw new Error(`Failed to load sponsors: ${error.message}`);
  }

  return data ?? [];
}

export async function getPlayers(): Promise<PlayerWithSponsor[]> {
  const db = requireSupabase();
  const { data, error } = await db
    .from('player_profiles_public')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error) {
    throw new Error(`Failed to load players: ${error.message}`);
  }

  return (data ?? []).map((player: any) => ({
    id: player.id,
    first_name: player.first_name,
    last_name: player.last_name,
    display_name: player.display_name,
    short_name: player.short_name,
    role_label: player.role_label,
    batting_style: player.batting_style,
    bowling_style: player.bowling_style,
    bio: player.bio,
    image_url: player.image_url,
    is_active: player.is_active,
    sort_order: player.sort_order,
    sponsor: player.sponsor_id
      ? {
          id: player.sponsor_id,
          name: player.sponsor_name,
          slug: player.sponsor_slug,
          description: player.sponsor_description,
          sponsor_type: 'player',
          sort_order: 100,
          active: true
        }
      : null,
    batting_2026: {
      id: `bat-${player.id}`,
      player_id: player.id,
      season_year: 2026,
      competition_code: null,
      balls: player.batting_balls,
      wkts: player.batting_wickets,
      runs: player.batting_runs,
      net_runs: player.batting_net_runs,
      strike_rate: player.batting_strike_rate,
      balls_per_wkt: player.batting_balls_per_wicket ?? null,
      net_strike_rate: player.batting_net_strike_rate ?? null
    },
    bowling_2026: {
      id: `bowl-${player.id}`,
      player_id: player.id,
      season_year: 2026,
      competition_code: null,
      balls: player.bowling_balls,
      wkts: player.bowling_wickets,
      runs: player.bowling_runs,
      wides: player.bowling_wides,
      nbs: player.bowling_no_balls,
      balls_per_wkt: player.bowling_balls_per_wicket ?? null,
      runs_per_over: player.bowling_runs_per_over,
      net_runs_per_over: player.bowling_net_runs_per_over ?? null,
      extras_per_over: player.bowling_extras_per_over ?? null
    }
  }));
}

export async function getFixtures(): Promise<FixtureResult[]> {
  const db = requireSupabase();
  const { data, error } = await db
    .from('fixtures_results_public')
    .select('*')
    .order('starts_at', { ascending: false });

  if (error) {
    throw new Error(`Failed to load fixtures: ${error.message}`);
  }

  return data ?? [];
}

export async function getEvents(): Promise<EventItem[]> {
  const db = requireSupabase();
  const { data, error } = await db
    .from('events')
    .select('*')
    .eq('status', 'published')
    .order('event_date', { ascending: true, nullsFirst: false });

  if (error) {
    throw new Error(`Failed to load events: ${error.message}`);
  }

  return data ?? [];
}