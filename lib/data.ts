import { supabase } from './supabase';
import type { PlayerWithSponsor, PlayerCareerStats } from '@/lib/types';

function requireSupabase() {
  if (!supabase) {
    throw new Error('Supabase client not initialised');
  }
  return supabase;
}

export async function getPlayers(): Promise<PlayerWithSponsor[]> {
  const db = requireSupabase();

  // 1. Load players (your main view)
  const { data: playersData, error: playersError } = await db
    .from('player_profiles_public')
    .select('*')
    .eq('is_active', true)
    .order('batting_balls', { ascending: false, nullsFirst: false });

  if (playersError) {
    throw new Error(`Failed to load players: ${playersError.message}`);
  }

  // 2. Load career stats (NEW VIEW)
  const { data: statsData, error: statsError } = await db
    .from('player_career_stats_public')
    .select('*');

  if (statsError) {
    throw new Error(`Failed to load player stats: ${statsError.message}`);
  }

  // 3. Map stats by player_id
  const statsMap = new Map<string, PlayerCareerStats>(
    (statsData ?? []).map((row: any) => [row.player_id, row])
  );

  // 4. Merge everything together
  return (playersData ?? []).map((player: any) => ({
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

    // Sponsor
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

    // 2026 batting (kept for compatibility)
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

    // 2026 bowling (kept for compatibility)
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
    },

    // ⭐ NEW: Career stats from database view
    career_stats: statsMap.get(player.id) ?? null
  }));
}