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
      <div className="section-intro-top">
        <h1 className="page-title page-title--main">{title}</h1>

        {ctaLabel && ctaUrl ? (
          <Link href={ctaUrl} className="button-link section-intro-cta">
            {ctaLabel}
          </Link>
        ) : null}
      </div>

      {intro ? <p className="lead">{intro}</p> : null}
    </div>
  );
}