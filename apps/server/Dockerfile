# syntax=docker/dockerfile:1
# Build from the monorepo root:
#   docker build -f apps/server/Dockerfile -t portfolio-server .

FROM node:24-bookworm-slim AS base

RUN apt-get update \
  && apt-get install -y --no-install-recommends openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/*

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS builder

WORKDIR /app
ENV CI=true

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY packages/shared ./packages/shared
COPY packages/types ./packages/types
COPY apps/server ./apps/server

RUN pnpm install --frozen-lockfile --filter @portfolio/server...
RUN pnpm --filter @portfolio/shared build
RUN pnpm --filter @portfolio/types build
RUN pnpm --filter @portfolio/server build
RUN pnpm --filter @portfolio/server --prod deploy --legacy /app/deploy

FROM base AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3001
ENV IMAGES_BUCKET=/data/vico-images

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 --ingroup nodejs portfolio \
  && mkdir -p /data/vico-images \
  && chown portfolio:nodejs /data/vico-images

COPY --from=builder --chown=portfolio:nodejs /app/deploy ./
COPY --from=builder --chown=portfolio:nodejs /app/apps/server/prisma ./prisma
COPY --from=builder --chown=portfolio:nodejs /app/apps/server/prisma.config.ts ./prisma.config.ts

USER portfolio

EXPOSE 3001

CMD ["node", "dist/src/index.js"]
