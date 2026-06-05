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

  const [isIndividualEntry, setIsIndividualEntry] = useState(false);

  function toggleIndividualEntry() {
    const teamNameInput = document.querySelector(
      'input[name="teamName"]'
    ) as HTMLInputElement | null;
  
    const teamMembersInput = document.querySelector(
      'textarea[name="teamMembers"]'
    ) as HTMLTextAreaElement | null;
  
    if (!teamNameInput || !teamMembersInput) return;
  
    if (!isIndividualEntry) {
      teamNameInput.value = 'Individual Entry';
      teamMembersInput.value = '';
      setIsIndividualEntry(true);
    } else {
      teamNameInput.value = '';
      setIsIndividualEntry(false);
    }
  }

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
        teamName: formData.get('teamName'),
        teamMembers: formData.get('teamMembers'),
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

    form.reset();
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
	      onClick={toggleIndividualEntry}
	    >
	      {isIndividualEntry
	        ? 'Switch back to team entry'
	        : 'Or click for individual entry'}
	    </button>
	  </div>
	
	  <input
	    name="teamName"
	    required
	    placeholder="Team name"
	    onChange={(e) => {
	      const value = e.target.value.trim();
	
	      if (
	        isIndividualEntry &&
	        value.toLowerCase() !== 'individual entry'
	      ) {
	        setIsIndividualEntry(false);
	      }
	    }}
	  />
	</label>

        <label>
	  Team members
	  <textarea
	    name="teamMembers"
	    rows={4}
	    disabled={isIndividualEntry}
	    placeholder={
	      isIndividualEntry
	        ? 'Not required for individual entry'
	        : 'Optional - add names if you know them'
	    }
	  />
	</label>
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