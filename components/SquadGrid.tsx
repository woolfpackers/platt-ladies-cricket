import Image from 'next/image';
import type { PlayerWithSponsor } from '@/lib/types';

function hasBatting(player: PlayerWithSponsor) {
  return Boolean(player.batting_2026 && (((player.batting_2026.balls ?? 0) > 0) || ((player.batting_2026.runs ?? 0) > 0)));
}

function hasBowling(player: PlayerWithSponsor) {
  return Boolean(player.bowling_2026 && (((player.bowling_2026.balls ?? 0) > 0) || ((player.bowling_2026.wkts ?? 0) > 0) || ((player.bowling_2026.runs ?? 0) > 0)));
}

export function SquadGrid({ players }: { players: PlayerWithSponsor[] }) {
  return (
    <div className="cards-grid">
      {players.map((player) => (
        <article key={player.id} className="player-card">
          <Image src={player.image_url || '/images/player-placeholder.jpg'} alt={player.display_name} width={500} height={520} className="player-photo" />
          <div>
            <h2 className="small-heading">{player.display_name}</h2>
            <p className="footer-note">{player.role_label || 'Squad player'}{player.short_name ? ` • ${player.short_name}` : ''}</p>
          </div>
          {hasBatting(player) ? (
            <div className="stat-block">
              <div className="stat-block__title">2026 batting totals</div>
              <div className="stat-grid">
                <div><strong>Runs</strong><span>{player.batting_2026?.runs ?? 0}</span></div>
                <div><strong>Net runs</strong><span>{player.batting_2026?.net_runs ?? 0}</span></div>
                <div><strong>Balls</strong><span>{player.batting_2026?.balls ?? 0}</span></div>
                <div><strong>Wkts</strong><span>{player.batting_2026?.wkts ?? 0}</span></div>
              </div>
            </div>
          ) : null}
          {hasBowling(player) ? (
            <div className="stat-block">
              <div className="stat-block__title">2026 bowling totals</div>
              <div className="stat-grid">
                <div><strong>Wkts</strong><span>{player.bowling_2026?.wkts ?? 0}</span></div>
                <div><strong>Balls</strong><span>{player.bowling_2026?.balls ?? 0}</span></div>
                <div><strong>Runs</strong><span>{player.bowling_2026?.runs ?? 0}</span></div>
                <div><strong>Wides</strong><span>{player.bowling_2026?.wides ?? 0}</span></div>
              </div>
            </div>
          ) : null}
          <div><span className="muted-label">{player.sponsor ? `Sponsored by ${player.sponsor.name}` : 'Available for sponsorship'}</span></div>
        </article>
      ))}
    </div>
  );
}
