'use client';

import { useMemo, useState } from 'react';
import type { FixtureResult } from '@/lib/types';

type ModeFilter = 'all' | 'fixtures' | 'results';

export function FixturesResultsView({ items }: { items: FixtureResult[] }) {
  const [mode, setMode] = useState<ModeFilter>('all');
  const [season, setSeason] = useState<string>('all');
  const [competition, setCompetition] = useState<string>('all');

  const seasons = useMemo(() => {
    return Array.from(
      new Set(items.map((item) => String(item.season_year)).filter(Boolean))
    ).sort((a, b) => Number(b) - Number(a));
  }, [items]);

  const competitions = useMemo(() => {
    return Array.from(
      new Set(items.map((item) => item.competition_code).filter(Boolean))
    ).sort();
  }, [items]);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const isResult =
        Boolean(item.home_score) ||
        Boolean(item.away_score) ||
        Boolean(item.result_summary);

      if (mode === 'fixtures' && isResult) return false;
      if (mode === 'results' && !isResult) return false;
      if (season !== 'all' && String(item.season_year) !== season) return false;
      if (competition !== 'all' && item.competition_code !== competition) return false;

      return true;
    });
  }, [items, mode, season, competition]);

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = date.toLocaleDateString('en-GB', { month: 'short' });
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  return (
    <div className="page-stack">
      <section className="section-card">
        <div className="fixtures-filters-top">
          <div className="filter-inline-group">
            <label htmlFor="mode-filter">Show</label>
            <select
              id="mode-filter"
              value={mode}
              onChange={(e) => setMode(e.target.value as ModeFilter)}
            >
              <option value="all">All</option>
              <option value="fixtures">Fixtures</option>
              <option value="results">Results</option>
            </select>
          </div>

          <div className="filter-inline-group">
            <label htmlFor="season-filter">Season</label>
            <select
              id="season-filter"
              value={season}
              onChange={(e) => setSeason(e.target.value)}
            >
              <option value="all">All seasons</option>
              {seasons.map((seasonOption) => (
                <option key={seasonOption} value={seasonOption}>
                  {seasonOption}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-inline-group">
            <label htmlFor="competition-filter">Competition</label>
            <select
              id="competition-filter"
              value={competition}
              onChange={(e) => setCompetition(e.target.value)}
            >
              <option value="all">All competitions</option>
              {competitions.map((competitionOption) => (
                <option key={competitionOption} value={competitionOption}>
                  {competitionOption}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="page-stack">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => {
            const isResult =
              Boolean(item.home_score) ||
              Boolean(item.away_score) ||
              Boolean(item.result_summary);

            return (
              <article key={item.id} className="fixture-card">
                <p className="fixture-line-main">
                  {formatDate(item.starts_at)} - {item.competition_code || item.competition_name || 'Competition'} -{' '}
                  {item.home_team || 'Home Team'} vs {item.away_team || 'Away Team'}
                </p>

                <p className="fixture-line-sub">
                  {item.home_team || 'Home Team'}: {item.home_score || '-'}
                </p>

                <p className="fixture-line-sub">
                  {item.away_team || 'Away Team'}: {item.away_score || '-'}
                </p>

                <p className="fixture-line-sub">
                  Result: {item.result_summary || (isResult ? 'Result recorded' : 'Fixture not yet played')}
                </p>

                {item.external_link ? (
                  <div style={{ marginTop: 12 }}>
                    <a
                      className="button-link"
                      href={item.external_link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View details
                    </a>
                  </div>
                ) : null}
              </article>
            );
          })
        ) : (
          <div className="section-card">
            <p className="lead" style={{ margin: 0 }}>
              No fixtures or results match the selected filters.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}