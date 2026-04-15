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
    <div className="stat-pill">
      <span className="muted-label">{label}</span>
      <strong>{value ?? '-'}</strong>
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

  const player = players.find((p) => String(p.id).trim() === String(id ?? '').trim());

  if (!player) {
    return (
      <PageShell>
        <section className="section-card sponsorship-player-top">
	  <div className="sponsorship-player-flex">
    
	    <div className="sponsorship-player-image-wrap">
	      <Image
	        src={player.image_url || '/images/player-placeholder.jpg'}
	        alt={player.display_name}
	        width={450}   
	        height={450}
	        className="sponsorship-player-image"
	        priority
	      />
	    </div>

	    <div className="sponsorship-player-copy">
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
	    </div>

	  </div>
	</section>

      <section className="section-card sponsorship-player-image-card">
        <div className="sponsorship-player-image-wrap">
          <Image
            src={player.image_url || '/images/player-placeholder.jpg'}
            alt={player.display_name}
            width={900}
            height={900}
            className="sponsorship-player-image"
            priority
          />
        </div>
      </section>

      <section className="section-card sponsorship-player-copy">
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
      </section>

      <section className="section-card sponsorship-player-stats">
        <h2 className="page-title sponsorship-section-title">Batting Stats</h2>
        <div className="stat-grid">
          <StatItem label="Runs" value={player.batting_2026?.runs} />
          <StatItem label="Balls" value={player.batting_2026?.balls} />
          <StatItem label="Wickets Lost" value={player.batting_2026?.wkts} />
          <StatItem label="Strike Rate" value={player.batting_2026?.strike_rate} />
          <StatItem label="Net Runs" value={player.batting_2026?.net_runs} />
          <StatItem label="Net Strike Rate" value={player.batting_2026?.net_strike_rate} />
        </div>

        <h2 className="page-title sponsorship-section-title">Bowling Stats</h2>
        <div className="stat-grid">
          <StatItem label="Runs" value={player.bowling_2026?.runs} />
          <StatItem label="Balls" value={player.bowling_2026?.balls} />
          <StatItem label="Wickets" value={player.bowling_2026?.wkts} />
          <StatItem label="Wides" value={player.bowling_2026?.wides} />
          <StatItem label="No Balls" value={player.bowling_2026?.nbs} />
          <StatItem label="Runs / Over" value={player.bowling_2026?.runs_per_over} />
        </div>
      </section>

      <section className="sponsorship-player-cta-wrap">
        <Link
          href={`/contact?subject=${encodeURIComponent(`Player Sponsorship - ${player.display_name}`)}`}
          className="button"
        >
          Click here to Sponsor Me
        </Link>
      </section>

      <section className="section-card sponsorship-benefits-card small-text">
        <SectionIntro
          title={sponsorshipContent?.title ?? 'What you get with sponsorship'}
          intro={sponsorshipContent?.intro ?? ''}
        />

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