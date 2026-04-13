import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { name, email, message } = await req.json();

  await resend.emails.send({
    from: 'Platt Ladies <onboarding@resend.dev>',
    to: 'plattladiescricket@divelive.co.uk',
    subject: 'New Contact Form Message',
    html: `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p>${message}</p>
    `,
  });

  return NextResponse.json({ success: true });
}