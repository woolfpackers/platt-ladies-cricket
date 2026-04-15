import Image from 'next/image';
import { PageShell } from '@/components/PageShell';
import { SectionIntro } from '@/components/SectionIntro';
import {
  getPageContent,
  getPartnershipOpportunitiesLongTerm,
  getPartnershipOpportunitiesShortTerm,
} from '@/lib/data';

export const dynamic = 'force-dynamic';

function TableCell({ value }: { value: string | null }) {
  return <div className="partnership-cell-text">{value ?? ''}</div>;
}

export default async function PartnershipOpportunitiesPage() {
  const [content, longTermRows, shortTermRows] = await Promise.all([
    getPageContent('partnership-opportunities'),
    getPartnershipOpportunitiesLongTerm(),
    getPartnershipOpportunitiesShortTerm(),
  ]);

  return (
    <PageShell>
      <section className="section-card">
        <SectionIntro
          title={content?.title ?? 'Partnership Opportunities'}
          intro={
            content?.intro ??
            'Explore ways to support the club through long-term and short-term partnerships.'
          }
        />

        {content?.body_2 && (
          <div className="body-text">
            <p>{content.body_2}</p>
          </div>
        )}

        {content?.body_3 && (
          <div className="body-text">
            <p>{content.body_3}</p>
          </div>
        )}

        {content?.body_4 && (
          <div className="body-text">
            <p>{content.body_4}</p>
          </div>
        )}
      </section>

      <section className="section-card partnership-image-card">
        <div className="partnership-image-wrap">
          <Image
            src="/images/partnership.png"
            alt="Overall partnership opportunities"
            width={1400}
            height={700}
            className="partnership-image"
            priority
          />
        </div>
      </section>

      <section className="section-card partnership-table-card">
        <div className="partnership-table-scroll">
          <table className="partnership-table">
            <thead>
              <tr>
                <th>Partner Opportunity</th>
                <th>Founder Partner</th>
                <th>Platinum Partner</th>
                <th>Gold Partner</th>
                <th>Silver Partner</th>
              </tr>
            </thead>
            <tbody>
              {longTermRows.map((row) => (
                <tr key={row.id}>
                  <td><TableCell value={row.partner_opportunity} /></td>
                  <td><TableCell value={row.founder_partner} /></td>
                  <td><TableCell value={row.platinum_partner} /></td>
                  <td><TableCell value={row.gold_partner} /></td>
                  <td><TableCell value={row.silver_partner} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section-card partnership-table-card">
        <div className="partnership-table-scroll">
          <table className="partnership-table partnership-table-short">
            <thead>
              <tr>
                <th>Partner Opportunity</th>
                <th>Minimum exposure/benefit</th>
                <th>Investment Required (Min)</th>
              </tr>
            </thead>
            <tbody>
              {shortTermRows.map((row) => (
                <tr key={row.id}>
                  <td><TableCell value={row.partner_opportunity} /></td>
                  <td><TableCell value={row.minimum_exposure_benefit} /></td>
                  <td><TableCell value={row.investment_required_min} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </PageShell>
  );
}