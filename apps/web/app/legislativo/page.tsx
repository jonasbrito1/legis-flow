import { Sidebar } from '../../components/sidebar';
import { serverApi } from '../../lib/server-api';

type LegislativeDocument = {
  id: string;
  number: string;
  year: number;
  type: string;
  title: string;
  summary: string;
  author: string;
  status: string;
  protocol?: string;
  createdAt: string;
};

type PlenarySession = {
  id: string;
  title: string;
  date: string;
  agenda: string;
  isClosed: boolean;
};

export default async function LegislativePage() {
  const [documents, sessions] = await Promise.all([
    serverApi<LegislativeDocument[]>('/legislative/documents'),
    serverApi<PlenarySession[]>('/legislative/sessions'),
  ]);

  return (
    <div className="shell">
      <Sidebar />
      <main className="main">
        <header className="page-header">
          <div>
            <div className="eyebrow">Modulo legislativo</div>
            <h1>Projetos, tramitacoes, sessoes e votacoes.</h1>
            <p className="muted">Cadastre materias legislativas, acompanhe protocolos e prepare pautas de sessao.</p>
          </div>
        </header>

        <section className="workspace">
          <form className="panel form-grid" action="/api/legislative/documents" method="post">
            <h2>Novo documento</h2>
            <div className="field">
              <label htmlFor="type">Tipo</label>
              <select id="type" name="type" defaultValue="Projeto de Lei">
                <option>Projeto de Lei</option>
                <option>Requerimento</option>
                <option>Indicacao</option>
                <option>Mocao</option>
                <option>Decreto Legislativo</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="number">Numero</label>
              <input id="number" name="number" required />
            </div>
            <div className="field">
              <label htmlFor="year">Ano</label>
              <input id="year" name="year" type="number" defaultValue={new Date().getFullYear()} required />
            </div>
            <div className="field wide">
              <label htmlFor="title">Ementa</label>
              <input id="title" name="title" required />
            </div>
            <div className="field wide">
              <label htmlFor="summary">Resumo</label>
              <textarea id="summary" name="summary" required />
            </div>
            <div className="field">
              <label htmlFor="author">Autor</label>
              <input id="author" name="author" defaultValue="Mesa Diretora" required />
            </div>
            <button className="button" type="submit">Protocolar documento</button>
          </form>

          <form className="panel form-grid" action="/api/legislative/sessions" method="post">
            <h2>Nova sessao</h2>
            <div className="field wide">
              <label htmlFor="session-title">Titulo</label>
              <input id="session-title" name="title" defaultValue="Sessao Ordinaria" required />
            </div>
            <div className="field">
              <label htmlFor="date">Data e hora</label>
              <input id="date" name="date" type="datetime-local" required />
            </div>
            <div className="field wide">
              <label htmlFor="agenda">Pauta</label>
              <textarea id="agenda" name="agenda" required />
            </div>
            <button className="button" type="submit">Agendar sessao</button>
          </form>
        </section>

        <section className="data-section">
          <div className="section-title">
            <h2>Documentos legislativos</h2>
            <span className="badge">{documents.length} registros</span>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Protocolo</th>
                  <th>Tipo</th>
                  <th>Ementa</th>
                  <th>Autor</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((item) => (
                  <tr key={item.id}>
                    <td>{item.protocol}</td>
                    <td>{item.type} {item.number}/{item.year}</td>
                    <td>{item.title}</td>
                    <td>{item.author}</td>
                    <td><span className="badge">{item.status}</span></td>
                  </tr>
                ))}
                {!documents.length ? <tr><td colSpan={5}>Nenhum documento cadastrado.</td></tr> : null}
              </tbody>
            </table>
          </div>
        </section>

        <section className="data-section">
          <div className="section-title">
            <h2>Sessoes plenarias</h2>
            <span className="badge">{sessions.length} agendas</span>
          </div>
          <div className="records">
            {sessions.map((session) => (
              <article className="record" key={session.id}>
                <strong>{session.title}</strong>
                <span>{new Date(session.date).toLocaleString('pt-BR')}</span>
                <p>{session.agenda}</p>
              </article>
            ))}
            {!sessions.length ? <p className="muted">Nenhuma sessao cadastrada.</p> : null}
          </div>
        </section>
      </main>
    </div>
  );
}

