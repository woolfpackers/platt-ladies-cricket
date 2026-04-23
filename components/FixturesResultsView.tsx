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

  const baseFilteredItems = useMemo(() => {
    return items.filter((item) => {
      if (season !== 'all' && String(item.season_year) !== season) return false;
      if (competition !== 'all' && item.competition_code !== competition) return false;
      return true;
    });
  }, [items, season, competition]);

  const results = useMemo(() => {
    return [...baseFilteredItems]
      .filter((item) => {
        return (
          Boolean(item.home_score) ||
          Boolean(item.away_score) ||
          Boolean(item.result_summary)
        );
      })
      .sort((a, b) => {
        return new Date(b.starts_at).getTime() - new Date(a.starts_at).getTime();
      });
  }, [baseFilteredItems]);

  const fixtures = useMemo(() => {
    return [...baseFilteredItems]
      .filter((item) => {
        return !(
          Boolean(item.home_score) ||
          Boolean(item.away_score) ||
          Boolean(item.result_summary)
        );
      })
      .sort((a, b) => {
        return new Date(a.starts_at).getTime() - new Date(b.starts_at).getTime();
      });
  }, [baseFilteredItems]);

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = date.toLocaleDateString('en-GB', { month: 'short' });
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  function renderItem(item: FixtureResult) {
    const isResult =
      Boolean(item.home_score) ||
      Boolean(item.away_score) ||
      Boolean(item.result_summary);

    return (
      <article key={item.id} className="fixture-card">
        <p className="fixture-line-main">
          {formatDate(item.starts_at)} -{' '}
          {item.competition_code || item.competition_name || 'Competition'} -{' '}
          {item.home_team || 'Home Team'} vs {item.away_team || 'Away Team'}
        </p>

        {isResult ? (
          <>
            <p className="fixture-line-sub">
              {item.home_team || 'Home Team'}: {item.home_score || '-'}
            </p>

            <p className="fixture-line-sub">
              {item.away_team || 'Away Team'}: {item.away_score || '-'}
            </p>

            <p className="fixture-line-sub">
              Result: {item.result_summary || 'Result recorded'}
            </p>
          </>
        ) : null}

        {item.external_link ? (
          <div style={{ marginTop: isResult ? 12 : 4 }}>
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
  }

  const showAll = mode === 'all';
  const showResultsOnly = mode === 'results';
  const showFixturesOnly = mode === 'fixtures';

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

      {showAll ? (
        <section className="fixtures-results-split">
          <div className="page-stack">
            <div className="section-card">
              <h2 className="sponsorship-section-title">Results</h2>
            </div>

            {results.length > 0 ? (
              results.map(renderItem)
            ) : (
              <div className="section-card">
                <p className="lead" style={{ margin: 0 }}>
                  No results match the selected filters.
                </p>
              </div>
            )}
          </div>

          <div className="page-stack">
            <div className="section-card">
              <h2 className="sponsorship-section-title">Fixtures</h2>
            </div>

            {fixtures.length > 0 ? (
              fixtures.map(renderItem)
            ) : (
              <div className="section-card">
                <p className="lead" style={{ margin: 0 }}>
                  No fixtures match the selected filters.
                </p>
              </div>
            )}
          </div>
        </section>
      ) : (
        <section className="page-stack">
          {showResultsOnly && (
            <>
              {results.length > 0 ? (
                results.map(renderItem)
              ) : (
                <div className="section-card">
                  <p className="lead" style={{ margin: 0 }}>
                    No results match the selected filters.
                  </p>
                </div>
              )}
            </>
          )}

          {showFixturesOnly && (
            <>
              {fixtures.length > 0 ? (
                fixtures.map(renderItem)
              ) : (
                <div className="section-card">
                  <p className="lead" style={{ margin: 0 }}>
                    No fixtures match the selected filters.
                  </p>
                </div>
              )}
            </>
          )}
        </section>
      )}
    </div>
  );
}