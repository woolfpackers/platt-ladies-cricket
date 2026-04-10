# Platt Ladies Cricket website

This package contains the fuller website starter plus real 2026 squad, season-summary stats, fixtures, and completed results imported from your workbook.

## What changed in this version
- Real squad loaded from the workbook
- Unique player IDs generated independently from names
- 2026 batting season totals imported
- 2026 bowling season totals imported
- 2026 fixtures imported from the Season Schedule tab
- Completed results imported from the Match Results - 2026 tab
- Normalized Supabase schema extended with player_batting_stats, player_bowling_stats, and competition_divisions
- Front-end squad cards now show 2026 batting/bowling totals
- Fixtures page now shows imported results and upcoming schedule

## Workbook assumptions used
- Batting and bowling figures are season totals to date for 2026
- Player names are not treated as unique identifiers
- A generated UUID is used for each player
- Jen Vallance from the stats sheet is treated as the same person as Jenny Vallance in the squad list
- KWSB fixtures are split into West and Central divisions
- Indoor TIL dates in late 2025 are treated as part of the 2026 season dataset

## Supabase setup
1. Create a Supabase project
2. Run schema.sql
3. Run seed.sql
4. Copy .env.example to .env.local
5. Add your Supabase URL and anon key
6. Start the site with npm install then npm run dev
