import { fixtures, pageContent, pageSections, players, sponsors, events, siteSettings } from './mock-data';
import { supabase } from './supabase';
import type { EventItem, FixtureResult, PageContent, PageSection, PlayerWithSponsor, SiteSettings, Sponsor } from './types';

export async function getPageContent(slug: string): Promise<PageContent | null> {
  if (!supabase) return pageContent[slug] ?? null;
  const { data, error } = await supabase.from('page_content').select('*').eq('slug', slug).maybeSingle();
  if (error) return pageContent[slug] ?? null;
  return data ?? pageContent[slug] ?? null;
}

export async function getPageSections(pageSlug: string): Promise<PageSection[]> {
  if (!supabase) return pageSections[pageSlug] ?? [];
  const { data, error } = await supabase.from('page_sections').select('*').eq('page_slug', pageSlug).order('sort_order', { ascending: true });
  if (error || !data) return pageSections[pageSlug] ?? [];
  return data;
}

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!supabase) return siteSettings;
  const { data, error } = await supabase.from('site_settings').select('setting_value').eq('setting_key', 'club_identity').maybeSingle();
  if (error || !data?.setting_value) return siteSettings;
  return data.setting_value as SiteSettings;
}

export async function getSponsors(): Promise<Sponsor[]> {
  if (!supabase) return sponsors;
  const { data, error } = await supabase.from('sponsors').select('*').eq('active', true).order('sort_order', { ascending: true });
  if (error || !data) return sponsors;
  return data;
}

export async function getPlayers(): Promise<PlayerWithSponsor[]> {
  if (!supabase) return players;
  const { data, error } = await supabase.from('player_profiles_public').select('*').eq('is_active', true).order('sort_order', { ascending: true });
  if (error || !data) return players;
  return data.map((player: any) => ({
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
    sponsor: player.sponsor_id ? { id: player.sponsor_id, name: player.sponsor_name, slug: player.sponsor_slug, description: player.sponsor_description, sponsor_type: 'player', sort_order: 100, active: true } : null,
    batting_2026: { id: `bat-${player.id}`, player_id: player.id, season_year: 2026, balls: player.batting_balls, wkts: player.batting_wickets, runs: player.batting_runs, net_runs: player.batting_net_runs, strike_rate: player.batting_strike_rate },
    bowling_2026: { id: `bowl-${player.id}`, player_id: player.id, season_year: 2026, balls: player.bowling_balls, wkts: player.bowling_wickets, runs: player.bowling_runs, wides: player.bowling_wides, nbs: player.bowling_no_balls, runs_per_over: player.bowling_runs_per_over }
  }));
}

export async function getFixtures(): Promise<FixtureResult[]> {
  if (!supabase) return fixtures;
  const { data, error } = await supabase.from('fixtures_results_public').select('*').order('starts_at', { ascending: false });
  if (error || !data) return fixtures;
  return data;
}

export async function getEvents(): Promise<EventItem[]> {
  if (!supabase) return events;
  const { data, error } = await supabase.from('events').select('*').eq('status', 'published').order('event_date', { ascending: true, nullsFirst: false });
  if (error || !data) return events;
  return data;
}
