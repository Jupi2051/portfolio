# syntax=docker/dockerfile:1
# Build from the monorepo root:
#   docker build -f apps/web/Dockerfile -t portfolio-web .

FROM node:24-bookworm-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS builder

WORKDIR /app
ENV CI=true

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY packages/shared ./packages/shared
COPY packages/types ./packages/types
COPY apps/web ./apps/web

RUN pnpm install --frozen-lockfile --filter @portfolio/web...
RUN pnpm --filter @portfolio/web build

FROM nginx:alpine AS runner

COPY --from=builder /app/apps/web/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
