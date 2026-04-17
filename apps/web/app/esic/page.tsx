import { Sidebar } from '../../components/sidebar';
import { serverApi } from '../../lib/server-api';

type EsicRequest = {
  id: string;
  protocol: string;
  requesterName: string;
  requesterEmail: string;
  subject: string;
  description: string;
  status: string;
  dueDate: string;
  answer?: string;
};

export default async function EsicAdminPage() {
  const requests = await serverApi<EsicRequest[]>('/esic/requests');

  return (
    <div className="shell">
      <Sidebar />
      <main className="main">
        <header className="page-header">
          <div>
            <div className="eyebrow">e-SIC</div>
            <h1>Solicitacoes publicas, prazos e respostas.</h1>
            <p className="muted">Acompanhe demandas da Lei de Acesso a Informacao e registre respostas formais.</p>
          </div>
          <a className="button" href="/solicitacoes">Abrir portal publico</a>
        </header>

        <section className="data-section">
          <div className="section-title">
            <h2>Demandas recebidas</h2>
            <span className="badge">{requests.length} solicitacoes</span>
          </div>
          <div className="records">
            {requests.map((request) => (
              <article className="record split-record" key={request.id}>
                <div>
                  <span className="badge">{request.status}</span>
                  <h3>{request.protocol} - {request.subject}</h3>
                  <p>{request.description}</p>
                  <span className="muted">Solicitante: {request.requesterName} ({request.requesterEmail})</span>
                  <span className="muted">Prazo: {new Date(request.dueDate).toLocaleDateString('pt-BR')}</span>
                  {request.answer ? <p><strong>Resposta:</strong> {request.answer}</p> : null}
                </div>
                <form className="inline-answer" action="/actions/esic/answer" method="post">
                  <input type="hidden" name="id" value={request.id} />
                  <label htmlFor={`answer-${request.id}`}>Resposta</label>
                  <textarea id={`answer-${request.id}`} name="answer" placeholder="Registre a resposta oficial" required />
                  <button className="button" type="submit">Responder</button>
                </form>
              </article>
            ))}
            {!requests.length ? <p className="muted">Nenhuma solicitacao recebida.</p> : null}
          </div>
        </section>
      </main>
    </div>
  );
}

