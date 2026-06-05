import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function POST(request: Request) {
  try {
    if (!supabaseUrl || !supabaseServiceRoleKey) {
      return NextResponse.json(
        { error: 'Supabase server environment variables are missing.' },
        { status: 500 },
      );
    }

    const body = await request.json();

    const leadName = String(body.leadName ?? '').trim();
    const email = String(body.email ?? '').trim();
    const teamName = String(body.teamName ?? '').trim();
    const teamMembers = String(body.teamMembers ?? '').trim();
    const notes = String(body.notes ?? '').trim();

    if (!leadName || !email || !teamName) {
      return NextResponse.json(
        { error: 'Lead name, email and team name are required.' },
        { status: 400 },
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

    const { error } = await supabase.from('quiz_night_registrations').insert({
      lead_name: leadName,
      email,
      team_name: teamName,
      team_members: teamMembers || null,
      notes: notes || null,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: 'Invalid registration request.' },
      { status: 400 },
    );
  }
}