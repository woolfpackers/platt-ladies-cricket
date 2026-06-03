import Image from 'next/image';
import Link from 'next/link';
import { QuizNightRegistrationForm } from './quiz-night-registration-form';
import { PageShell } from '@/components/PageShell';
import { SectionIntro } from '@/components/SectionIntro';

export const dynamic = 'force-dynamic';

const crowdfunderUrl =
  'https://www.crowdfunder.co.uk/p/platt-cricket-club-pavilion-project';

export default function QuizNightPage() {
  return (
    <PageShell>
      <section className="section-card quiz-night-hero">
        <div className="quiz-night-hero-text">
          <SectionIntro
            title="Quiz Night"
            intro="Join Platt Ladies Cricket for a brilliant fundraising quiz night in support of our new community pavilion."
          />

          <div className="quiz-night-details">
            <p><strong>Date:</strong> Saturday 20 June 2026</p>
            <p><strong>Venue:</strong> Platt Memorial Hall</p>
            <p><strong>Start:</strong> Prompt 7:30pm</p>
            <p><strong>Includes:</strong> One free drink per person with every ticket</p>
          </div>

          <Link
            href={crowdfunderUrl}
            target="_blank"
            className="quiz-night-main-button"
          >
            Pay entry fee on Crowdfunder
          </Link>
        </div>

        <div className="quiz-night-flyer">
          <Image
            src="/images/platt-ladies/quiz_night.jpg"
            alt="Platt Ladies Cricket Quiz Night flyer"
            fill
            className="quiz-night-flyer-image"
            priority
          />
        </div>
      </section>

      <section className="quiz-night-grid">
        <div className="section-card">
          <h2 className="events-heading">Example rounds</h2>
          <ul className="quiz-night-list">
            <li>General knowledge</li>
            <li>Sport and cricket</li>
            <li>Music intros</li>
            <li>Picture round</li>
            <li>Local legends</li>
            <li>Films, TV and famous faces</li>
          </ul>
        </div>

        <div className="section-card">
          <h2 className="events-heading">Sample questions</h2>
          <div className="quiz-night-question">
            <strong>Question:</strong> How many balls are there in a standard cricket over?
            <br />
            <em>Answer: Six</em>
          </div>
          <div className="quiz-night-question">
            <strong>Question:</strong> Which planet is known as the Red Planet?
            <br />
            <em>Answer: Mars</em>
          </div>
        </div>
      </section>

      <section className="section-card quiz-night-register-card">
        <h2 className="events-heading">Register your team</h2>
        <p className="body-text">
          Register your team below, then pay your entry fee through Crowdfunder.
          Please use your team name when donating so we can match your payment to your registration.
        </p>

        <QuizNightRegistrationForm crowdfunderUrl={crowdfunderUrl} />
      </section>
    </PageShell>
  );
}