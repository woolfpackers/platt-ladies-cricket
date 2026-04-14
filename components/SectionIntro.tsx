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
    <div className="section-intro-header">
      <div>
        <h1 className="page-title">{title}</h1>
        {intro ? <p className="lead">{intro}</p> : null}
      </div>

      {ctaLabel && ctaUrl ? (
        <Link href={ctaUrl} className="button-link section-intro-cta">
          {ctaLabel}
        </Link>
      ) : null}
    </div>
  );
}