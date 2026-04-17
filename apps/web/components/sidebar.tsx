'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const items = [
  ['Dashboard', '/dashboard'],
  ['Legislativo', '/legislativo'],
  ['Administrativo', '/administrativo'],
  ['e-SIC', '/esic'],
  ['Arquivos', '/arquivos'],
  ['Usuarios', '/usuarios'],
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <div className="brand">LegisFlow</div>
      <nav className="nav" aria-label="Principal">
        {items.map(([label, href]) => (
          <Link key={href} href={href} className={pathname === href ? 'active' : undefined}>
            {label}
          </Link>
        ))}
      </nav>
      <form action="/actions/auth/logout" method="post" className="logout-form">
        <button type="submit">Sair</button>
      </form>
    </aside>
  );
}
