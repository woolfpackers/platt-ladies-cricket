import Image from 'next/image';
import { PageShell } from '@/components/PageShell';
import { SectionIntro } from '@/components/SectionIntro';
import { getPageContent } from '@/lib/data';

export default async function AboutPage() {
  const content = await getPageContent('about');

  return (
    <PageShell>
      <div className="two-col">
        <section className="section-card">
          {content ? (
            <>
              <div className="about-intro">
                <SectionIntro title={content.title} intro={content.intro} />
              </div>
              {content.body ? <p className="lead">{content.body}</p> : null}

              {content.cta_label && content.cta_url ? (
                <div style={{ marginTop: 18 }}>
                  <a className="button-link" href={content.cta_url}>
                    {content.cta_label}
                  </a>
                </div>
              ) : null}
            </>
          ) : (
            <>
              <h1 className="about-page-title">About our club</h1>
              <p className="lead">No page content was found in the database for this page yet.</p>
            </>
          )}
        </section>

        <aside>
          {content?.image_url ? (
            <Image
              src={content.image_url}
              alt={content.image_alt || 'About our club'}
              width={700}
              height={700}
              className="about-image-only"
              priority
            />
          ) : null}
        </aside>
      </div>
    </PageShell>
  );
}