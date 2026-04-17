import { Sidebar } from '../../components/sidebar';
import { serverApi } from '../../lib/server-api';

type Sector = { id: string; name: string; acronym: string };
type Process = {
  id: string;
  protocol: string;
  subject: string;
  description: string;
  status: string;
  sector?: Sector;
  createdAt: string;
};

export default async function AdministrativePage() {
  const [processes, sectors] = await Promise.all([
    serverApi<Process[]>('/administrative/processes'),
    serverApi<Sector[]>('/tenancy/sectors'),
  ]);

  return (
    <div className="shell">
      <Sidebar />
      <main className="main">
        <header className="page-header">
          <div>
            <div className="eyebrow">Modulo administrativo</div>
            <h1>Processos internos, protocolo digital e setores.</h1>
            <p className="muted">Organize demandas administrativas com protocolo, responsavel e historico auditavel.</p>
          </div>
        </header>

        <section className="workspace">
          <form className="panel form-grid" action="/api/administrative/processes" method="post">
            <h2>Novo processo</h2>
            <div className="field wide">
              <label htmlFor="subject">Assunto</label>
              <input id="subject" name="subject" required />
            </div>
            <div className="field">
              <label htmlFor="sectorId">Setor</label>
              <select id="sectorId" name="sectorId" defaultValue="">
                <option value="">Sem setor</option>
                {sectors.map((sector) => <option key={sector.id} value={sector.id}>{sector.acronym} - {sector.name}</option>)}
              </select>
            </div>
            <div className="field wide">
              <label htmlFor="description">Descricao</label>
              <textarea id="description" name="description" required />
            </div>
            <button className="button" type="submit">Abrir processo</button>
          </form>

          <form className="panel form-grid" action="/api/sectors" method="post">
            <h2>Novo setor</h2>
            <div className="field wide">
              <label htmlFor="name">Nome</label>
              <input id="name" name="name" required />
            </div>
            <div className="field">
              <label htmlFor="acronym">Sigla</label>
              <input id="acronym" name="acronym" required />
            </div>
            <button className="button" type="submit">Cadastrar setor</button>
          </form>
        </section>

        <section className="data-section">
          <div className="section-title">
            <h2>Processos internos</h2>
            <span className="badge">{processes.length} protocolos</span>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Protocolo</th>
                  <th>Assunto</th>
                  <th>Setor</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {processes.map((process) => (
                  <tr key={process.id}>
                    <td>{process.protocol}</td>
                    <td>{process.subject}</td>
                    <td>{process.sector?.acronym ?? 'Sem setor'}</td>
                    <td><span className="badge">{process.status}</span></td>
                  </tr>
                ))}
                {!processes.length ? <tr><td colSpan={4}>Nenhum processo cadastrado.</td></tr> : null}
              </tbody>
            </table>
          </div>
        </section>

        <section className="data-section">
          <div className="section-title">
            <h2>Setores</h2>
            <span className="badge">{sectors.length} setores</span>
          </div>
          <div className="records compact">
            {sectors.map((sector) => <article className="record" key={sector.id}><strong>{sector.acronym}</strong><span>{sector.name}</span></article>)}
            {!sectors.length ? <p className="muted">Nenhum setor cadastrado.</p> : null}
          </div>
        </section>
      </main>
    </div>
  );
}

