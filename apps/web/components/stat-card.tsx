export function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <article className="card stat">
      <strong>{value}</strong>
      <span className="muted">{label}</span>
    </article>
  );
}

