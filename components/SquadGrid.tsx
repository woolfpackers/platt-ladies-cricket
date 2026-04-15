import Image from 'next/image';
import Link from 'next/link';
import type { PlayerWithSponsor } from '@/lib/types';

function formatStat(value: number | null | undefined, decimals = 2) {
  if (value === null || value === undefined) return '—';
  return Number(value).toFixed(decimals).replace(/\.00$/, '');
}

export function SquadGrid({ players }: { players: PlayerWithSponsor[] }) {
  return (
    <div className="cards-grid">
      {players.map((player) => (
        <article key={player.id} className="player-card">
          <div className="player-photo-wrap">
            <Image
              src={player.image_url || '/images/player-placeholder.jpg'}
              alt={player.display_name}
              width={500}
              height={520}
              className="player-photo"
            />
          </div>

          <div>
            <h2 className="small-heading">{player.display_name}</h2>
            <p className="footer-note">
              {player.role_label || 'Squad player'}
              {player.short_name ? ` • ${player.short_name}` : ''}
            </p>
          </div>

          <div className="stat-block">
            <div className="stats-heading">Batting Stats:</div>
            <div className="stats-list">
              <div><strong>Batting average:</strong> <span>{formatStat(player.career_stats?.batting_average)}</span></div>
              <div><strong>Strike Rate:</strong> <span>{formatStat(player.career_stats?.batting_strike_rate)}</span></div>
              <div><strong>Total Runs:</strong> <span>{player.career_stats?.batting_total_runs ?? 0}</span></div>
            </div>
          </div>

          <div className="stat-block">
            <div className="stats-heading">Bowling Stats:</div>
            <div className="stats-list">
              <div><strong>Bowling average:</strong> <span>{formatStat(player.career_stats?.bowling_average)}</span></div>
              <div><strong>Bowling strike rate:</strong> <span>{formatStat(player.career_stats?.bowling_strike_rate)}</span></div>
              <div><strong>Economy rate:</strong> <span>{formatStat(player.career_stats?.economy_rate)}</span></div>
            </div>
          </div>

          <div>
            {player.sponsor ? (
              <span className="muted-label">
                Sponsored by {player.sponsor.name}
              </span>
            ) : (
              <Link
                href={`/player-sponsorship?id=${encodeURIComponent(player.id)}`}
                className="button"
              >
                Available for sponsorship
              </Link>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}