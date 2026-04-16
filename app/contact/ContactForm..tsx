'use client';

import { useState } from 'react';

export default function ContactForm({
  initialSubject,
}: {
  initialSubject: string;
}) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: initialSubject,
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function updateField(
    field: 'name' | 'email' | 'subject' | 'message',
    value: string
  ) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error('Failed to send');
      }

      setSuccess(true);
      setForm({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      console.error(error);
      alert('Something went wrong sending your message.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Your name"
        value={form.name}
        onChange={(e) => updateField('name', e.target.value)}
        required
      />

      <input
        type="email"
        placeholder="Your email"
        value={form.email}
        onChange={(e) => updateField('email', e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Subject"
        value={form.subject}
        onChange={(e) => updateField('subject', e.target.value)}
        required
      />

      <textarea
        placeholder="Your message"
        rows={6}
        value={form.message}
        onChange={(e) => updateField('message', e.target.value)}
        required
      />

      <button type="submit" className="button" disabled={loading}>
        {loading ? 'Sending...' : 'Get in touch'}
      </button>

      {success && (
        <p className="lead" style={{ marginTop: 12 }}>
          Thanks — your message has been sent.
        </p>
      )}
    </form>
  );
}