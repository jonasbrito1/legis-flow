# Arquitetura

## Organizacao

- `apps/api`: NestJS modular, API REST, JWT, RBAC e auditoria.
- `apps/web`: Next.js para painel administrativo e portal publico.
- `packages/database`: Prisma schema, migrations e seed.
- `infra`: Nginx, scripts operacionais e pontos de extensao para TLS/backup.

## Multi-tenant

Todas as entidades de negocio possuem `tenantId`. As rotas autenticadas usam o `tenantId` presente no JWT para filtrar consultas e criacoes.

## Modulos

- Auth: login por tenant, JWT e cookie httpOnly.
- Tenancy: dados da camara e setores.
- Users: usuarios, papeis e vinculo com setores.
- Legislative: documentos, tramitacoes, sessoes e votacoes.
- Administrative: processos internos e protocolo.
- e-SIC: solicitacoes publicas, prazos e respostas.
- Files: metadados no PostgreSQL e binarios em S3 compativel.
- Dashboard: indicadores agregados por tenant.

## Proximos hardenings recomendados

- Refresh token e revogacao por Redis.
- Politicas finas por modulo alem do papel global.
- Assinatura digital de documentos.
- Migracoes versionadas geradas pelo Prisma.
- Pipeline CI com lint, build, testes e scan de dependencias.
- TLS com Let's Encrypt na VPS.

