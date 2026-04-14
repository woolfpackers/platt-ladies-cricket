'use client';

import { useState } from 'react';
import { PageShell } from '@/components/PageShell';

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    console.log(data);

    setLoading(false);

    if (res.ok) {
      setSuccess(true);
      setForm({ name: '', email: '', message: '' });
    } else {
      alert('There was a problem sending your message.');
    }
  }

  return (
    <PageShell>
      <div className="section-card">
        <h1 className="page-title">Contact Us</h1>

        {success ? (
          <p className="lead">Thanks! We’ll be in touch.</p>
        ) : (
          <div className="contact-form-wrapper">
            <form className="contact-form" onSubmit={handleSubmit}>
              <input
                placeholder="Name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <input
                placeholder="Email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <textarea
                placeholder="Message"
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
              <button className="button-link" type="submit" disabled={loading}>
                {loading ? 'Sending...' : 'Submit'}
              </button>
            </form>
          </div>
        )}
      </div>
    </PageShell>
  );
}