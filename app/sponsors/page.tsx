import Image from 'next/image';
import Link from 'next/link';
import { PageShell } from '@/components/PageShell';
import { SectionIntro } from '@/components/SectionIntro';

const sponsors = [
  {
    name: 'Fourways Dental Surgery',
    description:
      'Providing high quality dental care to the local community.',
    logo: '/images/fourways.png',
    url: 'https://www.fourwaysdentalsurgery.com/',
  },
  {
    name: 'Shakti',
    description:
      'Supporting wellbeing and community through holistic services.',
    logo: '/images/shakti-logo.png',
    url: 'https://www.facebook.com/profile.php?id=61565495850859',
  },
  {
    name: 'Parkfoot Garage',
    description:
      'Reliable, trusted local garage offering a full range of services.',
    logo: '/images/parkfoot-logo.png',
    url: 'https://www.parkfoot.net/',
  },
];

export default function SponsorsPage() {
  return (
    <PageShell>
      <SectionIntro
        title="Our Sponsors"
        intro="We are incredibly grateful to our sponsors for their support."
      />

      <div className="sponsors-grid">
        {sponsors.map((sponsor) => (
          <div key={sponsor.name} className="section-card sponsor-card">
            
            <a
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              className="sponsor-logo-link"
            >
              <Image
                src={sponsor.logo}
                alt={sponsor.name}
                width={200}
                height={100}
                className="sponsor-logo"
              />
            </a>

            <h2>{sponsor.name}</h2>
            <p>{sponsor.description}</p>
          </div>
        ))}
      </div>
    </PageShell>
  );
}