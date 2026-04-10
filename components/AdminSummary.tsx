import Link from 'next/link';

export function AdminSummary({ title, description, href }: { title: string; description: string; href?: string }) {
  return (
    <div className="content-panel" style={{ padding: 20 }}>
      <h2 className="small-heading" style={{ marginBottom: 8 }}>{title}</h2>
      <p className="lead" style={{ marginTop: 0 }}>{description}</p>
      {href ? <Link className="button-link" href={href}>Open section</Link> : null}
    </div>
  );
}
