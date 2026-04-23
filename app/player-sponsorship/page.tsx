import Image from 'next/image';
import Link from 'next/link';
import { PageShell } from '@/components/PageShell';
import { SectionIntro } from '@/components/SectionIntro';
import { getPageContent, getPlayers } from '@/lib/data';

export const dynamic = 'force-dynamic';

function StatItem({
  label,
  value,
}: {
  label: string;
  value: string | number | null | undefined;
}) {
  return (
    <div className="stat-pill sponsorship-stat-pill">
      <strong>
        <span className="sponsorship-stat-label">{label}:</span>
        <span className="sponsorship-stat-value">{value ?? '-'}</span>
      </strong>
    </div>
  );
}

export default async function PlayerSponsorshipPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id } = await searchParams;

  const [players, sponsorshipContent] = await Promise.all([
    getPlayers(),
    getPageContent('player-sponsorship'),
  ]);

  const currentIndex = players.findIndex(
    (p) => String(p.id).trim() === String(id ?? '').trim()
  );

  const player = currentIndex >= 0 ? players[currentIndex] : null;
  const previousPlayer = currentIndex > 0 ? players[currentIndex - 1] : null;
  const nextPlayer =
    currentIndex >= 0 && currentIndex < players.length - 1
      ? players[currentIndex + 1]
      : null;

  if (!player) {
    return (
      <PageShell>
        <section className="section-card">
          <h1 className="page-title page-title--main">Player not found</h1>
          <p className="lead">We could not find that player sponsorship page.</p>
        </section>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <section className="section-card sponsorship-player-header">
        <div className="sponsorship-player-header-row">
          <div className="sponsorship-player-header-copy">
            <SectionIntro
              title={`Player Profile - ${player.display_name}`}
              intro=""
            />
          </div>

          <div className="sponsorship-player-nav">
            {previousPlayer ? (
              <Link
                href={`/player-sponsorship?id=${previousPlayer.id}`}
                className="button-link sponsorship-player-nav-button"
              >
                &lt; Prev
              </Link>
            ) : (
              <span className="sponsorship-player-nav-spacer" />
            )}

            {nextPlayer ? (
              <Link
                href={`/player-sponsorship?id=${nextPlayer.id}`}
                className="button-link sponsorship-player-nav-button"
              >
                Next &gt;
              </Link>
            ) : (
              <span className="sponsorship-player-nav-spacer" />
            )}
          </div>
        </div>
      </section>

      <section className="sponsorship-player-main-grid">
        <section className="section-card sponsorship-player-profile-card">
          <div className="sponsorship-player-profile-layout">
            <div className="sponsorship-player-profile-image-wrap">
              <Image
                src={player.image_url || '/images/player-placeholder.jpg'}
                alt={player.display_name}
                width={360}
                height={360}
                className="sponsorship-player-profile-image"
                priority
              />
            </div>

            <div className="sponsorship-player-profile-copy">
              {player.player_profile_intro && (
                <div className="body-text">
                  <p>{player.player_profile_intro}</p>
                </div>
              )}

              {player.player_profile_1 && (
                <div className="body-text">
                  <p>{player.player_profile_1}</p>
                </div>
              )}

              {player.player_profile_2 && (
                <div className="body-text">
                  <p>{player.player_profile_2}</p>
                </div>
              )}

              <div className="sponsorship-player-cta-wrap sponsorship-player-cta-wrap--inside">
                <Link
                  href={`/contact?subject=${encodeURIComponent(
                    `Player Sponsorship - ${player.display_name}`
                  )}`}
                  className="button"
                >
                  Click here to Sponsor Me
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="section-card sponsorship-player-batting-card">
          <h2 className="page-title sponsorship-section-title">Batting Stats</h2>
          <div className="stat-grid sponsorship-stats-grid">
            <StatItem label="Runs" value={player.batting_2026?.runs} />
            <StatItem label="Balls" value={player.batting_2026?.balls} />
            <StatItem label="Wickets Lost" value={player.batting_2026?.wkts} />
            <StatItem label="Strike Rate" value={player.batting_2026?.strike_rate} />
            <StatItem label="Net Runs" value={player.batting_2026?.net_runs} />
            <StatItem
              label="Net Strike Rate"
              value={player.batting_2026?.net_strike_rate}
            />
          </div>

          <h2 className="page-title sponsorship-section-title">Bowling Stats</h2>
          <div className="stat-grid sponsorship-stats-grid">
            <StatItem label="Runs" value={player.bowling_2026?.runs} />
            <StatItem label="Balls" value={player.bowling_2026?.balls} />
            <StatItem label="Wickets" value={player.bowling_2026?.wkts} />
            <StatItem label="Wides" value={player.bowling_2026?.wides} />
            <StatItem label="No Balls" value={player.bowling_2026?.nbs} />
            <StatItem label="Runs / Over" value={player.bowling_2026?.runs_per_over} />
          </div>
        </section>
      </section>

      <section className="section-card sponsorship-benefits-card">
        <div className="sponsorship-benefits-intro">
          <SectionIntro
            title={sponsorshipContent?.title ?? 'What you get with sponsorship'}
            intro={sponsorshipContent?.intro ?? ''}
          />
        </div>

        {sponsorshipContent?.body && (
          <div className="body-text">
            <p>{sponsorshipContent.body}</p>
          </div>
        )}

        {sponsorshipContent?.body_2 && (
          <div className="body-text">
            <p>{sponsorshipContent.body_2}</p>
          </div>
        )}

        {sponsorshipContent?.body_3 && (
          <div className="body-text">
            <p>{sponsorshipContent.body_3}</p>
          </div>
        )}

        {sponsorshipContent?.body_4 && (
          <div className="body-text">
            <p>{sponsorshipContent.body_4}</p>
          </div>
        )}
      </section>
    </PageShell>
  );
}