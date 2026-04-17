import { Sidebar } from '../../components/sidebar';
import { StatCard } from '../../components/stat-card';
import type { DashboardStats } from '../../lib/api';
import { requireAccessToken, serverApi } from '../../lib/server-api';

async function getStats(): Promise<DashboardStats> {
  return serverApi<DashboardStats>('/dashboard');
}

export default async function DashboardPage() {
  await requireAccessToken();
  const stats = await getStats();

  return (
    <div className="shell">
      <Sidebar />
      <main className="main">
        <div className="topbar">
          <div>
            <div className="eyebrow">Camara municipal</div>
            <h1>Gestao legislativa, administrativa e e-SIC em um unico fluxo.</h1>
            <p className="muted">Acompanhe demandas, documentos, prazos e votacoes com rastreabilidade completa.</p>
          </div>
          <img
            className="hero-image"
            src="https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=900&q=80"
            alt="Plenario legislativo"
          />
          <a className="button" href="/solicitacoes">
            Abrir e-SIC
          </a>
        </div>

        <section className="grid stats" aria-label="Indicadores">
          <StatCard label="Projetos e documentos" value={stats.documents} />
          <StatCard label="Sessoes plenarias" value={stats.sessions} />
          <StatCard label="Processos internos" value={stats.processes} />
          <StatCard label="e-SIC em aberto" value={stats.esicOpen} />
          <StatCard label="Arquivos digitais" value={stats.files} />
        </section>

        <section className="grid modules">
          <a className="card module-link" href="/legislativo" id="legislativo">
            <h2>Legislativo</h2>
            <p className="muted">Projetos de lei, tramitacoes, sessoes, atas, votacoes e historico completo.</p>
          </a>
          <a className="card module-link" href="/administrativo" id="administrativo">
            <h2>Administrativo</h2>
            <p className="muted">Processos internos, setores, protocolo digital e gestao documental.</p>
          </a>
          <a className="card module-link" href="/esic" id="esic">
            <h2>e-SIC</h2>
            <p className="muted">Solicitacoes publicas, controle de prazos, respostas e acompanhamento.</p>
          </a>
          <a className="card module-link" href="/arquivos" id="arquivos">
            <h2>Arquivos</h2>
            <p className="muted">Upload, versionamento, armazenamento S3 e controle de acesso.</p>
          </a>
          <a className="card module-link" href="/usuarios" id="usuarios">
            <h2>Usuarios</h2>
            <p className="muted">Perfis por papel, permissoes por modulo e logs de auditoria.</p>
          </a>
          <article className="card">
            <h2>SaaS</h2>
            <p className="muted">Modelo multi-tenant preparado para expandir para varias camaras.</p>
          </article>
        </section>
      </main>
    </div>
  );
}
