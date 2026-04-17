export default function SolicitationPage() {
  return (
    <main className="public-page">
      <section className="public-intro">
        <div className="eyebrow">Lei de Acesso a Informacao</div>
        <h1>Abra uma solicitacao publica e acompanhe o prazo pelo protocolo.</h1>
        <p>O atendimento e registrado com rastreabilidade, resposta formal e controle de vencimento.</p>
      </section>
      <section className="public-form">
        <form className="form">
          <input type="hidden" name="tenantSlug" value="camara-demo" />
          <div className="field">
            <label htmlFor="requesterName">Nome</label>
            <input id="requesterName" name="requesterName" required />
          </div>
          <div className="field">
            <label htmlFor="requesterEmail">E-mail</label>
            <input id="requesterEmail" name="requesterEmail" type="email" required />
          </div>
          <div className="field">
            <label htmlFor="subject">Assunto</label>
            <input id="subject" name="subject" required />
          </div>
          <div className="field">
            <label htmlFor="description">Solicitacao</label>
            <textarea id="description" name="description" required />
          </div>
          <button className="button" type="submit">
            Gerar protocolo
          </button>
        </form>
      </section>
    </main>
  );
}

