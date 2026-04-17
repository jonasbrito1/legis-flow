import { Sidebar } from '../../components/sidebar';
import { serverApi } from '../../lib/server-api';

type Sector = { id: string; name: string; acronym: string };
type User = { id: string; name: string; email: string; role: string; isActive: boolean; sector?: Sector };

export default async function UsersPage() {
  const [users, sectors] = await Promise.all([
    serverApi<User[]>('/users'),
    serverApi<Sector[]>('/tenancy/sectors'),
  ]);

  return (
    <div className="shell">
      <Sidebar />
      <main className="main">
        <header className="page-header">
          <div>
            <div className="eyebrow">Usuarios e permissoes</div>
            <h1>Perfis, setores e acesso por papel.</h1>
            <p className="muted">Cadastre servidores, vereadores e administradores para operar cada modulo.</p>
          </div>
        </header>

        <section className="workspace">
          <form className="panel form-grid" action="/api/users" method="post">
            <h2>Novo usuario</h2>
            <div className="field wide">
              <label htmlFor="name">Nome</label>
              <input id="name" name="name" required />
            </div>
            <div className="field wide">
              <label htmlFor="email">E-mail</label>
              <input id="email" name="email" type="email" required />
            </div>
            <div className="field">
              <label htmlFor="role">Perfil</label>
              <select id="role" name="role" defaultValue="SERVIDOR">
                <option value="ADMIN">Administrador</option>
                <option value="SERVIDOR">Servidor</option>
                <option value="VEREADOR">Vereador</option>
                <option value="PUBLICO">Publico</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="sectorId">Setor</label>
              <select id="sectorId" name="sectorId" defaultValue="">
                <option value="">Sem setor</option>
                {sectors.map((sector) => <option key={sector.id} value={sector.id}>{sector.acronym}</option>)}
              </select>
            </div>
            <div className="field">
              <label htmlFor="password">Senha inicial</label>
              <input id="password" name="password" type="password" defaultValue="Senha@123456" required />
            </div>
            <button className="button" type="submit">Criar usuario</button>
          </form>
        </section>

        <section className="data-section">
          <div className="section-title">
            <h2>Usuarios cadastrados</h2>
            <span className="badge">{users.length} contas</span>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>E-mail</th>
                  <th>Perfil</th>
                  <th>Setor</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td><span className="badge">{user.role}</span></td>
                    <td>{user.sector?.acronym ?? 'Sem setor'}</td>
                    <td>{user.isActive ? 'Ativo' : 'Inativo'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

