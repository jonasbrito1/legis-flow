# API LegisFlow

Base URL local: `http://localhost:4000/api`

Swagger: `/api/docs`

## Autenticacao

- `POST /auth/login`
  - Body: `tenantSlug`, `email`, `password`
  - Retorna JWT e dados basicos do usuario.

## Tenancy e setores

- `GET /tenancy/me`
- `GET /tenancy/sectors`
- `POST /tenancy/sectors` ADMIN

## Usuarios

- `GET /users` ADMIN, SERVIDOR
- `POST /users` ADMIN

Perfis suportados: `ADMIN`, `SERVIDOR`, `VEREADOR`, `PUBLICO`.

## Legislativo

- `GET /legislative/documents`
- `POST /legislative/documents` ADMIN, SERVIDOR, VEREADOR
- `POST /legislative/documents/:id/movements` ADMIN, SERVIDOR
- `GET /legislative/sessions`
- `POST /legislative/sessions` ADMIN, SERVIDOR
- `POST /legislative/votes` VEREADOR

## Administrativo

- `GET /administrative/processes` ADMIN, SERVIDOR
- `POST /administrative/processes` ADMIN, SERVIDOR

## e-SIC

- `POST /esic/requests` publico
- `GET /esic/requests/:protocol/public` publico
- `GET /esic/requests` ADMIN, SERVIDOR
- `POST /esic/requests/:id/answer` ADMIN, SERVIDOR

## Arquivos

- `GET /files`
- `POST /files/upload` ADMIN, SERVIDOR, VEREADOR

## Dashboard

- `GET /dashboard`

## Seguranca

- Todas as rotas privadas usam JWT Bearer ou cookie `access_token`.
- A API usa validação por DTO, Helmet, CORS configuravel, Prisma parametrizado e RBAC.
- A auditoria registra chamadas mutaveis autenticadas.
- Em producao, force HTTPS no proxy externo ou ajuste Nginx para redirecionar 80 para 443 com certificados validos.

