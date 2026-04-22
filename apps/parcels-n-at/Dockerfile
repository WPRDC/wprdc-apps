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
COPY /apps/parcels-n-at/.env.local /app/apps/parcels-n-at/.env.local

RUN turbo prune parcels-n-at --docker

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
COPY --from=builder /app/apps/parcels-n-at/.env.local /app/apps/parcels-n-at/.env.local

RUN turbo run build --filter=parcels-n-at

FROM alpine AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer /app/apps/parcels-n-at/next.config.js .
COPY --from=installer /app/apps/parcels-n-at/package.json .

COPY --from=installer --chown=nextjs:nodejs /app/apps/parcels-n-at/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/parcels-n-at/.next/static ./apps/parcels-n-at/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/parcels-n-at/public ./apps/parcels-n-at/public

CMD node apps/parcels-n-at/server.js
