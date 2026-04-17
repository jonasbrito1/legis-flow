type LoginPageProps = {
  searchParams?: Promise<{ erro?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;

  return (
    <main className="login-wrap">
      <section className="login-panel">
        <div>
          <div className="eyebrow">Acesso seguro</div>
          <h1>Entre para operar a camara em tempo real.</h1>
          <p className="muted">Use o ambiente demo para cadastrar documentos, processos, usuarios e solicitacoes.</p>
        </div>
        <form className="form" action="/api/auth/login" method="post">
          {params?.erro ? <p className="alert">Credenciais invalidas. Confira os dados e tente novamente.</p> : null}
          <div className="field">
            <label htmlFor="tenantSlug">Camara</label>
            <input id="tenantSlug" name="tenantSlug" defaultValue="camara-demo" />
          </div>
          <div className="field">
            <label htmlFor="email">E-mail</label>
            <input id="email" name="email" type="email" defaultValue="admin@legisflow.local" />
          </div>
          <div className="field">
            <label htmlFor="password">Senha</label>
            <input id="password" name="password" type="password" defaultValue="Admin@123456" />
          </div>
          <button className="button" type="submit">
            Acessar painel
          </button>
        </form>
      </section>
    </main>
  );
}
