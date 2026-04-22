FROM node:22-alpine AS alpine

# setup pnpm on the alpine base
FROM alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN npm install -g corepack@latest
RUN corepack enable
RUN pnpm install turbo --global

FROM base AS builder
RUN apk add --no-cache libc6-compat
RUN apk update

WORKDIR /app
COPY . .
COPY /apps/greenprint/.env.local /app/apps/greenprint/.env.local

RUN turbo prune greenprint --docker

FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
RUN pnpm install

COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json
COPY --from=builder /app/apps/greenprint/.env.local /app/apps/greenprint/.env.local

RUN turbo run build --filter=greenprint

FROM alpine AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer /app/apps/greenprint/next.config.ts .
COPY --from=installer /app/apps/greenprint/package.json .

COPY --from=installer --chown=nextjs:nodejs /app/apps/greenprint/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/greenprint/.next/static ./apps/greenprint/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/greenprint/public ./apps/greenprint/public

CMD node apps/greenprint/server.js