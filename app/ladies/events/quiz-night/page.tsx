import Image from 'next/image';
import Link from 'next/link';

import { PageShell } from '@/components/PageShell';
import { QuizNightRegistrationForm } from './quiz-night-registration-form';

export const dynamic = 'force-dynamic';

const crowdfunderUrl =
  'https://www.crowdfunder.co.uk/p/platt-cricket-club-pavilion-project';

export default function QuizNightPage() {
  return (
    <PageShell>
      <section className="quiz-night-page">
        <div className="quiz-night-main-poster">
          <Image
            src="/images/platt-ladies/events/quiz-night.png"
            alt="Platt Ladies Cricket Quiz Night"
            width={1200}
            height={1800}
            priority
            className="quiz-night-main-poster-image"
          />
        </div>

        <section className="quiz-night-register-card section-card">
          <div className="quiz-night-register-header">
            <div>
              <p className="quiz-night-kicker">Register your team</p>
              <h1>Quiz Night Team Registration</h1>
              <p>
                Register your team below, then pay through Crowdfunder using your
                team name as the donation reference.
              </p>
            </div>

            <Link
              href={crowdfunderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="quiz-night-pay-button"
            >
              Pay on Crowdfunder
            </Link>
          </div>

          <QuizNightRegistrationForm crowdfunderUrl={crowdfunderUrl} />
        </section>
      </section>
    </PageShell>
  );
}