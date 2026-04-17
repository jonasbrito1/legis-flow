# Memoria do Sistema LegisFlow

## Identidade

O **LegisFlow** e um sistema web SaaS moderno para gestao legislativa e administrativa de camaras municipais brasileiras.

O objetivo e entregar uma base real, modular, escalavel e pronta para evoluir em producao, com foco em orgaos publicos, transparencia, rastreabilidade, seguranca e facilidade de uso.

## Objetivo principal

Criar uma plataforma completa para centralizar:

- Gestao legislativa
- Gestao administrativa
- Protocolo digital
- e-SIC, conforme Lei de Acesso a Informacao
- Gestao de usuarios, setores e permissoes
- Arquivos digitais com versionamento
- Auditoria e historico de movimentacoes
- Operacao futura em modelo SaaS multi-tenant

## Stack tecnologica

- Backend: Node.js com NestJS
- Frontend: Next.js com React
- Banco de dados: PostgreSQL
- ORM: Prisma
- Autenticacao: JWT
- Autorizacao: RBAC por papeis
- Cache e sessao futura: Redis
- Arquivos: S3 compativel, usando MinIO localmente
- Infraestrutura: Docker Compose e Nginx
- Documentacao: Swagger na API e documentos em Markdown

## Estrutura atual do monorepo

```text
legis-flow/
  apps/
    api/                 API NestJS modular
    web/                 Frontend Next.js
  packages/
    database/            Prisma schema, seed e comandos do banco
  infra/
    nginx/               Configuracao de proxy reverso
    scripts/             Scripts operacionais, incluindo backup
  docs/
    API.md               Endpoints principais
    ARCHITECTURE.md      Decisoes de arquitetura
    MEMORIA_DO_SISTEMA.md Memoria consolidada do projeto
  docker-compose.yml     Stack local e base de producao
  README.md              Guia de execucao
```

## Modulos implementados na base inicial

### Autenticacao e seguranca

- Login por tenant usando `tenantSlug`, e-mail e senha.
- JWT assinado com `JWT_SECRET`.
- Cookie `access_token` httpOnly.
- Helmet, CORS configuravel e validacao global por DTO.
- RBAC com papeis:
  - `ADMIN`
  - `SERVIDOR`
  - `VEREADOR`
  - `PUBLICO`
- Auditoria automatica para rotas mutaveis autenticadas.

### Multi-tenant

- Entidade `Tenant` representa cada camara municipal.
- Entidades de negocio usam `tenantId`.
- Rotas autenticadas filtram dados pelo `tenantId` presente no JWT.
- Base preparada para evoluir para SaaS com varias camaras.

### Legislativo

- Cadastro de documentos legislativos.
- Protocolo de projetos/documentos.
- Tramitação por movimentacoes.
- Sessoes plenarias.
- Registro de votos por vereador.
- Historico de movimentacoes por documento.

### Administrativo

- Cadastro e listagem de processos internos.
- Geracao de protocolo administrativo.
- Vinculo opcional com setores.
- Estrutura para gestao documental.

### e-SIC

- Abertura publica de solicitacoes.
- Consulta publica por protocolo.
- Listagem administrativa por tenant.
- Resposta administrativa e encerramento da demanda.
- Controle de prazo inicial de 20 dias.

### Usuarios e setores

- Criacao de usuarios por administrador.
- Listagem de usuarios por tenant.
- Cadastro e listagem de setores.
- Vinculo de usuarios a setores.

### Arquivos

- Upload via API.
- Armazenamento em S3 compativel.
- MinIO para ambiente local.
- Metadados no PostgreSQL.
- Versionamento por nome de arquivo.
- Vinculo com documento legislativo, processo administrativo ou solicitacao e-SIC.

### Dashboard

- Indicadores agregados por tenant:
  - Documentos legislativos
  - Sessoes plenarias
  - Processos internos
  - Solicitações e-SIC abertas
  - Arquivos digitais

## Infraestrutura local

Servicos definidos no Docker Compose:

- `postgres`: banco PostgreSQL 16
- `redis`: cache Redis 7
- `minio`: armazenamento S3 local
- `api`: backend NestJS
- `web`: frontend Next.js
- `nginx`: proxy reverso para web e API

No startup Docker da API, o Prisma sincroniza o schema com `db push` e executa seed idempotente com:

- Camara: `camara-demo`
- Usuario: `admin@legisflow.local`
- Senha: `Admin@123456`

Portas locais:

- Web: `http://localhost:3000`
- API: `http://localhost:4000/api`
- Swagger: `http://localhost:4000/api/docs`
- Nginx HTTP: `http://localhost:8080`
- Nginx HTTPS: `https://localhost:8443`
- PostgreSQL: `localhost:55432`
- Redis: `localhost:56379`
- MinIO API: `http://localhost:59000`
- MinIO Console: `http://localhost:59001`

## Arquivos de ambiente

O arquivo versionado e `.env.example`.

Para rodar localmente, usar `.env`, que fica fora do Git:

```bash
cp .env.example .env
```

Variaveis principais:

- `DATABASE_URL`
- `REDIS_URL`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `S3_ENDPOINT`
- `S3_BUCKET`
- `S3_ACCESS_KEY`
- `S3_SECRET_KEY`
- `NEXT_PUBLIC_API_URL`
- `POSTGRES_HOST_PORT`
- `REDIS_HOST_PORT`
- `MINIO_HOST_PORT`
- `MINIO_CONSOLE_HOST_PORT`
- `NGINX_HTTP_PORT`
- `NGINX_HTTPS_PORT`
- `WEB_PORT`

## Comandos principais

Instalar dependencias:

```bash
npm install
```

Gerar Prisma Client:

```bash
npm run prisma:generate
```

Rodar build:

```bash
npm run build
```

Subir local via Docker:

```bash
docker compose up -d --build
```

Ver containers:

```bash
docker compose ps
```

Ver logs:

```bash
docker compose logs -f api
docker compose logs -f web
```

## Validacoes ja realizadas

- Repositorio Git inicializado.
- Commit inicial criado.
- Push realizado para `git@github.com:jonasbrito1/legis-flow.git`.
- Prisma Client gerado com sucesso.
- Build local da API e da Web executado com sucesso.
- `npm audit --omit=dev` retornou zero vulnerabilidades no momento da criacao da base.

## Estado atual do Git

Branch principal:

- `main`

Remoto:

- `origin git@github.com:jonasbrito1/legis-flow.git`

Commit inicial:

- `e2eed95 feat: scaffold LegisFlow SaaS platform`

Regra operacional definida pelo usuario:

- Cada nova atualizacao ou implementacao deve gerar commit e manter o repositorio remoto atualizado.

## Proximos passos recomendados

- Criar migrations Prisma versionadas em vez de depender apenas do schema.
- Adicionar seed automatizado no fluxo Docker.
- Implementar refresh token e revogacao de sessoes com Redis.
- Criar permissoes finas por modulo alem do papel global.
- Conectar o formulario publico e-SIC do frontend ao endpoint real.
- Implementar tela de login com chamada real para `/auth/login`.
- Criar telas CRUD dos modulos legislativo, administrativo, usuarios e arquivos.
- Configurar HTTPS real com Let's Encrypt na VPS.
- Adicionar pipeline CI com build, lint, audit e testes.
- Adicionar testes unitarios e e2e.
