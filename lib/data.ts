import { supabase } from './supabase';
import type {
  EventItem,
  FixtureResult,
  NewsItem,
  PageContent,
  PageSection,
  PlayerCareerStats,
  PlayerWithSponsor,
  SiteSettings,
  Sponsor,
  UpcomingItem,
} from './types';

function requireSupabase() {
  if (!supabase) {
    throw new Error('Supabase client not initialised');
  }
  return supabase;
}

export async function getPageContent(slug: string): Promise<PageContent | null> {
  const db = requireSupabase();

  const { data, error } = await db
    .from('page_content')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to load page content for "${slug}": ${error.message}`);
  }

  return (data as PageContent | null) ?? null;
}

export async function getPageSections(pageSlug: string): Promise<PageSection[]> {
  const db = requireSupabase();

  const { data, error } = await db
    .from('page_sections')
    .select('*')
    .eq('page_slug', pageSlug)
    .order('sort_order', { ascending: true });

  if (error) {
    throw new Error(`Failed to load page sections for "${pageSlug}": ${error.message}`);
  }

  return (data as PageSection[]) ?? [];
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  const db = requireSupabase();

  const { data, error } = await db
    .from('site_settings')
    .select('*')
    .limit(1)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to load site settings: ${error.message}`);
  }

  return (data as SiteSettings | null) ?? null;
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

  return (data as Sponsor[]) ?? [];
}

export async function getFixtures(): Promise<FixtureResult[]> {
  const db = requireSupabase();

  const { data, error } = await db
    .from('fixtures_results_public')
    .select('*')
    .order('starts_at', { ascending: true });

  if (error) {
    throw new Error(`Failed to load fixtures: ${error.message}`);
  }

  return (data as FixtureResult[]) ?? [];
}

export async function getEvents(): Promise<EventItem[]> {
  const db = requireSupabase();

  const { data, error } = await db
    .from('events')
    .select('*')
    .eq('status', 'published')
    .order('event_date', { ascending: true });

  if (error) {
    throw new Error(`Failed to load events: ${error.message}`);
  }

  return (data as EventItem[]) ?? [];
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

  return (data as NewsItem[]) ?? [];
}

export async function getUpcomingItems(limit = 5): Promise<UpcomingItem[]> {
  const db = requireSupabase();

  const { data, error } = await db
    .from('upcoming_items_public')
    .select('*')
    .order('item_datetime', { ascending: true })
    .limit(limit);

  if (error) {
    throw new Error(`Failed to load upcoming items: ${error.message}`);
  }

  return (data as UpcomingItem[]) ?? [];
}

export async function getPlayers(): Promise<PlayerWithSponsor[]> {
  const db = requireSupabase();

  const { data: playersData, error: playersError } = await db
    .from('player_profiles_public')
    .select('*')
    .eq('is_active', true)
    .order('batting_balls', { ascending: false, nullsFirst: false });

  if (playersError) {
    throw new Error(`Failed to load players: ${playersError.message}`);
  }

  const { data: statsData, error: statsError } = await db
    .from('player_career_stats_public')
    .select('*');

  if (statsError) {
    throw new Error(`Failed to load player career stats: ${statsError.message}`);
  }

  const statsMap = new Map<string, PlayerCareerStats>(
    ((statsData ?? []) as PlayerCareerStats[]).map((row) => [row.player_id, row])
  );

  return ((playersData ?? []) as any[]).map((player) => ({
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
          active: true,
        }
      : null,

    batting_2026: {
      id: `bat-${player.id}`,
      player_id: player.id,
      season_year: 2026,
      competition_code: null,
      balls: player.batting_balls ?? 0,
      wkts: player.batting_wickets ?? 0,
      runs: player.batting_runs ?? 0,
      net_runs: player.batting_net_runs ?? 0,
      strike_rate: player.batting_strike_rate ?? null,
      balls_per_wkt: player.batting_balls_per_wicket ?? null,
      net_strike_rate: player.batting_net_strike_rate ?? null,
    },

    bowling_2026: {
      id: `bowl-${player.id}`,
      player_id: player.id,
      season_year: 2026,
      competition_code: null,
      balls: player.bowling_balls ?? 0,
      wkts: player.bowling_wickets ?? 0,
      runs: player.bowling_runs ?? 0,
      wides: player.bowling_wides ?? 0,
      nbs: player.bowling_no_balls ?? 0,
      balls_per_wkt: player.bowling_balls_per_wicket ?? null,
      runs_per_over: player.bowling_runs_per_over ?? null,
      net_runs_per_over: player.bowling_net_runs_per_over ?? null,
      extras_per_over: player.bowling_extras_per_over ?? null,
    },

    career_stats: statsMap.get(player.id) ?? null,
  }));
}