import Link from 'next/link';

type SectionIntroProps = {
  title: string;
  intro?: string;
  ctaLabel?: string | null;
  ctaUrl?: string | null;
};

export function SectionIntro({
  title,
  intro,
  ctaLabel,
  ctaUrl,
}: SectionIntroProps) {
  return (
    <div className="section-intro">
      <h1 className="page-title">{title}</h1>

      <div className="section-intro-body">
        {ctaLabel && ctaUrl ? (
          <Link href={ctaUrl} className="button-link section-intro-cta">
            {ctaLabel}
          </Link>
        ) : null}

        {intro ? <p className="lead">{intro}</p> : null}
      </div>
    </div>
  );
}