import Image from 'next/image';
import Link from 'next/link';
import type { PlayerWithSponsor } from '@/lib/types';

function formatStat(value: number | null | undefined, decimals = 2) {
  if (value === null || value === undefined) return '—';
  return Number(value).toFixed(decimals).replace(/\.00$/, '');
}

function getPlayerSponsorshipHref(playerId: string | number) {
  return `/ladies/player-sponsorship/${encodeURIComponent(String(playerId))}`;
}

function getSponsorLogoUrl(player: PlayerWithSponsor) {
  const sponsor = player.sponsor as
    | (PlayerWithSponsor['sponsor'] & {
        logo_url?: string | null;
        sponsor_logo_url?: string | null;
        image_url?: string | null;
      })
    | null
    | undefined;

  return sponsor?.logo_url ?? sponsor?.sponsor_logo_url ?? sponsor?.image_url ?? null;
}

export function SquadGrid({ players }: { players: PlayerWithSponsor[] }) {
  return (
    <div className="cards-grid">
      {players.map((player) => {
        const sponsorshipHref = getPlayerSponsorshipHref(player.id);
        const sponsorLogoUrl = getSponsorLogoUrl(player);

        return (
          <article key={player.id} className="player-card">
            <div className="player-photo-wrap">
              <Image
                src={
                  player.image_url ||
                  '/images/platt-ladies/player-placeholder.jpg'
                }
                alt={player.display_name}
                width={500}
                height={520}
                className="player-photo"
              />
            </div>

            <div className="player-card-title-row">
              <div className="player-card-title-copy">
                <h2 className="small-heading">{player.display_name}</h2>
                <p className="footer-note">
                  {player.role_label || 'Squad player'}
                  {player.short_name ? ` • ${player.short_name}` : ''}
                </p>
              </div>

              {player.sponsor && sponsorLogoUrl && (
	        <div
	          className="player-card-sponsor-logo-wrap"
	          aria-label={`${player.display_name} sponsor: ${player.sponsor.name}`}
	        >
	          <Image
	            src={sponsorLogoUrl}
	            alt={`${player.sponsor.name} logo`}
	            width={88}
	            height={88}
	            className="player-card-sponsor-logo"
	          />
	        </div>
	      )}
            </div>

            <div className="stat-block">
              <div className="stats-heading">Batting Stats:</div>
              <div className="stats-list">
                <div>
                  <strong>Batting average:</strong>{' '}
                  <span>{formatStat(player.career_stats?.batting_average)}</span>
                </div>
                <div>
                  <strong>Strike Rate:</strong>{' '}
                  <span>
                    {formatStat(player.career_stats?.batting_strike_rate)}
                  </span>
                </div>
                <div>
                  <strong>Total Runs:</strong>{' '}
                  <span>{player.career_stats?.batting_total_runs ?? 0}</span>
                </div>
              </div>
            </div>

            <div className="stat-block">
              <div className="stats-heading">Bowling Stats:</div>
              <div className="stats-list">
                <div>
                  <strong>Bowling average:</strong>{' '}
                  <span>{formatStat(player.career_stats?.bowling_average)}</span>
                </div>
                <div>
                  <strong>Bowling strike rate:</strong>{' '}
                  <span>
                    {formatStat(player.career_stats?.bowling_strike_rate)}
                  </span>
                </div>
                <div>
                  <strong>Economy rate:</strong>{' '}
                  <span>{formatStat(player.career_stats?.economy_rate)}</span>
                </div>
              </div>
            </div>

            <div>
              {player.sponsor ? (
                <Link href={sponsorshipHref} className="taken-badge">
                  Sponsored by {player.sponsor.name}
                </Link>
              ) : (
                <Link href={sponsorshipHref} className="button">
                  Available for sponsorship
                </Link>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}
