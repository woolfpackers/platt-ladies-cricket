import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

export const dynamic = 'force-dynamic';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(value: unknown) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

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

    const supabase = createClient(
      supabaseUrl,
      supabaseServiceRoleKey,
    );

    const { error } = await supabase
      .from('quiz_night_registrations')
      .insert({
        lead_name: leadName,
        email,
        team_name: teamName,
        team_members: teamMembers || null,
        notes: notes || null,
      });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 },
      );
    }

    await resend.emails.send({
      from: 'Platt Ladies Cricket <PlattLadiesCricket@divelive.co.uk>',
      to: 'Platt Ladies Cricket <PlattLadiesCricket@divelive.co.uk>',
      replyTo: email,
      subject:
        teamName.toLowerCase() === 'individual entry'
          ? `🏏 Quiz Night Individual Entry - ${leadName}`
          : `🏏 Quiz Night Team Registration - ${teamName}`,
      html: `
        <h2>New Quiz Night Registration</h2>

        <p><strong>Lead Name:</strong> ${escapeHtml(leadName)}</p>

        <p><strong>Email:</strong> ${escapeHtml(email)}</p>

        <p><strong>Team Name:</strong> ${escapeHtml(teamName)}</p>

        <p><strong>Team Members:</strong></p>
        <p>${escapeHtml(teamMembers || 'None provided')}</p>

        <p><strong>Notes:</strong></p>
        <p>${escapeHtml(notes || 'None provided')}</p>

        <hr />

        <p>
          This registration has been successfully saved to the
          quiz_night_registrations table.
        </p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Quiz Night Registration Error:', error);

    return NextResponse.json(
      { error: 'Failed to process registration.' },
      { status: 500 },
    );
  }
}