'use client';

import { useMemo, useState } from 'react';
import type { FixtureResult } from '@/lib/types';

const competitionOptions: FixtureResult['competition_code'][] = ['KWSCIL', 'TIL', 'KWSCL', 'KWSB', 'Tournaments', 'Friendlies'];

export function FixturesResultsView({ fixtures }: { fixtures: FixtureResult[] }) {
  const years = useMemo(() => [...new Set(fixtures.map((item) => item.season_year))].sort((a, b) => b - a), [fixtures]);
  const [fixtureType, setFixtureType] = useState<'all' | 'fixture' | 'result'>('all');
  const [season, setSeason] = useState<'all' | number>('all');
  const [competition, setCompetition] = useState<'all' | FixtureResult['competition_code']>('all');

  const filtered = useMemo(() => fixtures.filter((item) => {
    if (fixtureType !== 'all' && item.fixture_type !== fixtureType) return false;
    if (season !== 'all' && item.season_year !== season) return false;
    if (competition !== 'all' && item.competition_code !== competition) return false;
    return true;
  }), [competition, fixtureType, fixtures, season]);

  const formatDate = (value: string) => new Date(value).toLocaleString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit' });

  return (
    <div className="fixture-layout">
      <aside className="content-panel filters-panel">
        <div className="filter-group">
          <h3>Show</h3>
          {['all', 'fixture', 'result'].map((value) => (
            <button key={value} type="button" className="nav-pill" style={{ marginRight: 8, marginBottom: 8, cursor: 'pointer' }} onClick={() => setFixtureType(value as 'all' | 'fixture' | 'result')}>
              {value === 'all' ? 'All' : value === 'fixture' ? 'Fixtures' : 'Results'}
            </button>
          ))}
        </div>
        <div className="filter-group">
          <h3>Season</h3>
          <button type="button" className="nav-pill" style={{ marginRight: 8, marginBottom: 8 }} onClick={() => setSeason('all')}>All</button>
          {years.map((year) => <button key={year} type="button" className="nav-pill" style={{ marginRight: 8, marginBottom: 8 }} onClick={() => setSeason(year)}>{year}</button>)}
        </div>
        <div className="filter-group">
          <h3>Competition</h3>
          <button type="button" className="nav-pill" style={{ marginRight: 8, marginBottom: 8 }} onClick={() => setCompetition('all')}>All</button>
          {competitionOptions.map((item) => <button key={item} type="button" className="nav-pill" style={{ marginRight: 8, marginBottom: 8 }} onClick={() => setCompetition(item)}>{item}</button>)}
        </div>
      </aside>
      <section className="section-card">
        <h1 className="page-title">Fixtures and Results</h1>
        <p className="lead">This page now includes your imported 2026 schedule and the completed results from the match-results workbook tab.</p>
        <div style={{ display: 'grid', gap: 16 }}>
          {filtered.map((item) => (
            <article key={item.id} className="fixture-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
                <h2 className="small-heading">{item.title}</h2>
                <span className="muted-label">{item.fixture_type === 'fixture' ? 'Fixture' : 'Result'}</span>
              </div>
              <div className="fixture-meta">
                <div><strong>Date</strong><br />{formatDate(item.starts_at)}</div>
                <div><strong>Season</strong><br />{item.season_year}</div>
                <div><strong>Competition</strong><br />{item.competition_division ? `${item.competition_code} • ${item.competition_division}` : item.competition_code}</div>
                <div><strong>Venue</strong><br />{item.venue_name || 'TBC'}</div>
              </div>
              <div><strong>{item.home_team}</strong> vs <strong>{item.away_team}</strong></div>
              {item.fixture_type === 'result' ? (
                <>
                  <div className="fixture-meta">
                    <div><strong>Platt score</strong><br />{item.home_score || '—'}</div>
                    <div><strong>Opponent score</strong><br />{item.away_score || '—'}</div>
                    <div style={{ gridColumn: 'span 2' }}><strong>Summary</strong><br />{item.result_summary || '—'}</div>
                  </div>
                  {item.report ? <p className="lead" style={{ margin: 0 }}>{item.report}</p> : null}
                </>
              ) : null}
            </article>
          ))}
          {filtered.length === 0 ? <p className="lead">No items match the selected filters.</p> : null}
        </div>
      </section>
    </div>
  );
}
