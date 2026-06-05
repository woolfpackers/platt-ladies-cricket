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
  const [teamName, setTeamName] = useState('');
  const [teamMembers, setTeamMembers] = useState('');

  const isIndividualEntry = teamName.trim().toLowerCase() === 'individual entry';

  function selectIndividualEntry() {
    setTeamName('Individual Entry');
    setTeamMembers('');
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    setStatus('saving');
    setMessage('');

    const response = await fetch('/api/quiz-night-registration', {
      method: 'POST',
      body: JSON.stringify({
        leadName: formData.get('leadName'),
        email: formData.get('email'),
        teamName,
        teamMembers: isIndividualEntry ? '' : teamMembers,
        notes: formData.get('notes'),
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
      'Team registered. Please now pay through Crowdfunder using your team name as the donation reference.',
    );

    event.currentTarget.reset();
    setTeamName('');
    setTeamMembers('');
  }

  return (
    <form className="quiz-night-form" onSubmit={handleSubmit}>
      <div className="quiz-night-form-grid">
        <label>
          Lead name
          <input name="leadName" required placeholder="Lead team member" />
        </label>

        <label>
          Email
          <input name="email" type="email" required placeholder="Email address" />
        </label>

        <label>
          <div className="quiz-night-team-label-row">
            <span>Team name</span>

            <button
              type="button"
              className="quiz-night-individual-button"
              onClick={selectIndividualEntry}
            >
              Or click for individual entry
            </button>
          </div>

          <input
            name="teamName"
            required
            placeholder="Team name"
            value={teamName}
            onChange={(event) => setTeamName(event.target.value)}
          />
        </label>

        <label>
          Team members
          <input
            name="teamMembers"
            placeholder={
              isIndividualEntry
                ? 'Not required for individual entry'
                : 'Optional - names if known'
            }
            value={teamMembers}
            disabled={isIndividualEntry}
            onChange={(event) => setTeamMembers(event.target.value)}
          />
        </label>
      </div>

      <label>
        Notes
        <textarea
          name="notes"
          rows={2}
          placeholder="Optional - dietary needs, accessibility, questions, etc."
        />
      </label>

      <div className="quiz-night-form-actions">
        <button type="submit" disabled={status === 'saving'}>
          {status === 'saving' ? 'Registering...' : 'Register team'}
        </button>

        <a href={crowdfunderUrl} target="_blank" rel="noopener noreferrer">
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