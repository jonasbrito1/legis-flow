# LegisFlow

Base SaaS moderna para gestao legislativa e administrativa de camaras municipais brasileiras.

## Stack

- Backend: NestJS, JWT, RBAC, Prisma, PostgreSQL, Redis e S3 compativel
- Frontend: Next.js, React e CSS responsivo
- Infra: Docker Compose, Nginx, HTTPS-ready, backup PostgreSQL
- Arquitetura: monorepo com separacao clara entre API, web e banco

## Modulos iniciais

- Legislativo: proposicoes, tramitacoes, sessoes, atas e votacoes
- Administrativo: processos internos, protocolo digital, documentos e setores
- e-SIC: solicitacoes publicas, prazos, respostas e painel administrativo
- Usuarios: perfis Administrador, Servidor, Vereador e Publico
- Arquivos: upload, versionamento e controle de acesso por tenant
- Auditoria: logs de acesso e movimentacoes relevantes

## Como executar

1. Copie `.env.example` para `.env`.
2. Suba a infraestrutura:

```bash
docker compose up -d postgres redis minio
```

3. Instale dependencias e gere Prisma:

```bash
npm install
npm run prisma:generate
```

4. Rode migracao inicial:

```bash
npm run prisma:migrate
```

5. Inicie API e web:

```bash
npm run dev
```

API: `http://localhost:4000/api`

Web: `http://localhost:3000`

Documentacao Swagger: `http://localhost:4000/api/docs`

Credenciais demo criadas no startup Docker:

- Camara: `camara-demo`
- E-mail: `admin@legisflow.local`
- Senha: `Admin@123456`

Portas Docker locais para servicos de apoio:

- PostgreSQL: `localhost:55432`
- Redis: `localhost:56379`
- MinIO API: `http://localhost:59000`
- MinIO Console: `http://localhost:59001`
- Nginx HTTP: `http://localhost:8080`
- Nginx HTTPS: `https://localhost:8443`

## Producao

Use `docker compose up -d --build` para subir PostgreSQL, Redis, MinIO, API, web e Nginx. Configure TLS real no Nginx ou em proxy externo da VPS.
