import { PageShell } from '@/components/PageShell';
import ContactForm from './ContactForm';

export const dynamic = 'force-dynamic';

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ subject?: string }>;
}) {
  const params = await searchParams;

  return (
    <PageShell>
      <section className="section-card">
        <h1 className="page-title">Contact Us</h1>
        <p className="lead">
          Get in touch with Platt Ladies Cricket using the form below.
        </p>

        <div className="contact-form-wrapper">
          <ContactForm initialSubject={params?.subject ?? ''} />
        </div>
      </section>
    </PageShell>
  );
}