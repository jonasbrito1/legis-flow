import Link from 'next/link';

const items = [
  ['Dashboard', '/dashboard'],
  ['Legislativo', '/dashboard#legislativo'],
  ['Administrativo', '/dashboard#administrativo'],
  ['e-SIC', '/dashboard#esic'],
  ['Arquivos', '/dashboard#arquivos'],
  ['Usuarios', '/dashboard#usuarios'],
];

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">LegisFlow</div>
      <nav className="nav" aria-label="Principal">
        {items.map(([label, href]) => (
          <Link key={href} href={href}>
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

