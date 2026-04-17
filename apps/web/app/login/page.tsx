export default function LoginPage() {
  return (
    <main className="login-wrap">
      <section className="card login-card">
        <div className="eyebrow">Acesso seguro</div>
        <h1>Entrar no LegisFlow</h1>
        <form className="form" action="/dashboard">
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
            <input id="password" name="password" type="password" />
          </div>
          <button className="button" type="submit">
            Acessar painel
          </button>
        </form>
      </section>
    </main>
  );
}

