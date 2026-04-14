import Image from 'next/image';
import { PageShell } from '@/components/PageShell';
import { SectionIntro } from '@/components/SectionIntro';
import { getPageContent } from '@/lib/data';

export const revalidate = 86400;

export default async function PavilionPage() {
  const content = await getPageContent('pavilion');

  return (
    <PageShell>
      <div className="two-col">
        <section className="section-card">
          {content ? (
            <>
              <SectionIntro
                title={content.title ?? 'New Pavilion Project'}
                intro={content.intro ?? ''}
              />
              {content.body ? <p className="lead">{content.body}</p> : null}
              {content.body_2 ? <p className="lead body-2-mobile-hide">{content.body_2}</p> : null}
              {content.body_3 ? <p className="lead body-2-mobile-hide">{content.body_3}</p> : null}
              {content.body_4 ? <p className="lead body-2-mobile-hide">{content.body_4}</p> : null}

              {content.cta_label && content.cta_url ? (
                <div style={{ marginTop: 18 }}>
                  <a className="button-link" href="/crowdfunding">
  		    Support Our Project
		  </a>
                </div>
              ) : null}
            </>
          ) : (
            <>
              <h1 className="page-title">New Pavilion Project</h1>
              <p className="lead">Building a modern, inclusive space for our growing club.</p>
            </>
          )}
        </section>

        <aside>
          {content?.image_url ? (
            <Image
              src={content.image_url}
              alt={content.image_alt || 'Pavilion'}
              width={900}
              height={650}
              className="about-image-only"
              priority
            />
          ) : null}
        </aside>
      </div>

      <div className="cards-grid" style={{ marginTop: 24 }}>
        {['pavilion_4.png', 'pavilion_5.png', 'pavilion_8.png'].map((img) => (
          <div className="media-frame pavilion-image" key={img}>
            <img src={`/images/pavilion/${img}`} alt="Pavilion" />
          </div>
        ))}
      </div>
    </PageShell>
  );
}