import Image from 'next/image';
import type { PageContent } from '@/lib/types';
import { SectionIntro } from './SectionIntro';

export function ContentPage({
  content,
  imageSrc = '/images/page-placeholder.jpg',
  imageAlt = 'Page image',
  children
}: {
  content: PageContent;
  imageSrc?: string;
  imageAlt?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="two-col">
      <section className="section-card">
        <SectionIntro title={content.title} intro={content.intro} />
        {content.body ? <p className="lead">{content.body}</p> : null}
        {content.cta_label && content.cta_url ? (
          <div style={{ marginTop: 18 }}>
            <a className="button-link" href={content.cta_url}>
              {content.cta_label}
            </a>
          </div>
        ) : null}
        {children}
      </section>

      <aside className="content-panel" style={{ padding: 18 }}>
        <div className="media-frame" style={{ minHeight: 340, position: 'relative' }}>
          <Image src={imageSrc} alt={imageAlt} fill sizes="(max-width: 980px) 100vw, 35vw" style={{ objectFit: 'cover' }} />
        </div>
      </aside>
    </div>
  );
}
