'use client';

import { useState } from 'react';

type FormStatus = 'idle' | 'saving' | 'success' | 'error';

export function QuizNightRegistrationForm({
  crowdfunderUrl,
}: {
  crowdfunderUrl: string;
}) {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus('saving');
    setMessage('');

    const response = await fetch('/api/quiz-night-registration', {
      method: 'POST',
      body: JSON.stringify({
        leadName: formData.get('leadName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        teamName: formData.get('teamName'),
        teamMembers: formData.get('teamMembers'),
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      setStatus('error');
      setMessage('Sorry, something went wrong. Please try again.');
      return;
    }

    setStatus('success');
    setMessage(
      'Team registered. Please now pay through Crowdfunder using your team name as the donation reference.'
    );

    form.reset();
  }

  return (
    <form className="quiz-night-form" onSubmit={handleSubmit}>
      <label>
        Lead team member
        <input name="leadName" required placeholder="Name" />
      </label>

      <label>
        Email address
        <input name="email" type="email" required placeholder="Email" />
      </label>

      <label>
        Phone number
        <input name="phone" placeholder="Optional" />
      </label>

      <label>
        Team name
        <input name="teamName" required placeholder="Team name" />
      </label>

      <label>
        Team members
        <textarea
          name="teamMembers"
          rows={4}
          placeholder="Optional - add names if you know them"
        />
      </label>

      <div className="quiz-night-form-actions">
        <button type="submit" disabled={status === 'saving'}>
          {status === 'saving' ? 'Registering...' : 'Register team'}
        </button>

        <a href={crowdfunderUrl} target="_blank">
          Open Crowdfunder
        </a>
      </div>

      {message && (
        <p className={`quiz-night-form-message quiz-night-form-message--${status}`}>
          {message}
        </p>
      )}
    </form>
  );
}