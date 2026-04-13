import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// app/api/ping/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  await supabase.from('pages').select('id').limit(1);
  return NextResponse.json({ ok: true });
}

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    const result = await resend.emails.send({
      from: 'Platt Ladies <plattladiescricket@divelive.co.uk>',
      to: ['plattladiescricket@divelive.co.uk'],
      replyTo: email,
      subject: `New Contact Form Message from ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${String(message).replace(/\n/g, '<br />')}</p>
      `,
    });

    console.log('Resend result:', result);

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error('Contact form send failed:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send email' },
      { status: 500 }
    );
  }
}