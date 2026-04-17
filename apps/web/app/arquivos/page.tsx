import { Sidebar } from '../../components/sidebar';
import { serverApi } from '../../lib/server-api';

type FileObject = {
  id: string;
  filename: string;
  mimeType: string;
  size: number;
  version: number;
  visibility: string;
  createdAt: string;
};

export default async function FilesPage() {
  const files = await serverApi<FileObject[]>('/files');

  return (
    <div className="shell">
      <Sidebar />
      <main className="main">
        <header className="page-header">
          <div>
            <div className="eyebrow">Arquivos digitais</div>
            <h1>Documentos, versoes e armazenamento seguro.</h1>
            <p className="muted">Envie arquivos para o repositorio S3 compativel e mantenha metadados auditaveis.</p>
          </div>
        </header>

        <section className="workspace">
          <form className="panel form-grid" action="/actions/files/upload" method="post" encType="multipart/form-data">
            <h2>Novo arquivo</h2>
            <div className="field wide">
              <label htmlFor="file">Documento</label>
              <input id="file" name="file" type="file" required />
            </div>
            <p className="muted wide">O arquivo sera enviado para o MinIO local e registrado no banco com versionamento.</p>
            <button className="button" type="submit">Enviar arquivo</button>
          </form>
        </section>

        <section className="data-section">
          <div className="section-title">
            <h2>Arquivos cadastrados</h2>
            <span className="badge">{files.length} itens</span>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Arquivo</th>
                  <th>Tipo</th>
                  <th>Tamanho</th>
                  <th>Versao</th>
                  <th>Acesso</th>
                </tr>
              </thead>
              <tbody>
                {files.map((file) => (
                  <tr key={file.id}>
                    <td>{file.filename}</td>
                    <td>{file.mimeType}</td>
                    <td>{Math.ceil(file.size / 1024)} KB</td>
                    <td>v{file.version}</td>
                    <td><span className="badge">{file.visibility}</span></td>
                  </tr>
                ))}
                {!files.length ? <tr><td colSpan={5}>Nenhum arquivo enviado.</td></tr> : null}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

