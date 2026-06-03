import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return NextResponse.json(
      { error: 'Missing Supabase environment variables' },
      { status: 500 }
    );
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);

  const body = await request.json();

  const leadName = String(body.leadName ?? '').trim();
  const email = String(body.email ?? '').trim();
  const phone = String(body.phone ?? '').trim();
  const teamName = String(body.teamName ?? '').trim();
  const teamMembers = String(body.teamMembers ?? '').trim();

  if (!leadName || !email || !teamName) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    );
  }

  const { error } = await supabase.from('quiz_night_registrations').insert({
    lead_name: leadName,
    email,
    phone,
    team_name: teamName,
    team_members: teamMembers,
    payment_url:
      'https://www.crowdfunder.co.uk/p/platt-cricket-club-pavilion-project',
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}