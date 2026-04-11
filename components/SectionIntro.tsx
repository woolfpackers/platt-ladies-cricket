export function SectionIntro({ title, intro }: { title: string; intro?: string | null }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <h1 className="about-page-title">{title}</h1>
      {intro ? <p className="lead">{intro}</p> : null}
    </div>
  );
}
