FROM node:20-alpine AS alpine

# setup pnpm on the alpine base
FROM alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN npm install -g corepack@latest
RUN corepack enable
RUN pnpm install turbo --global

FROM base AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk update

# Set working directory
WORKDIR /app
COPY . .
COPY /apps/parcels-n-at/.env.local /app/apps/parcels-n-at/.env.local
COPY .env .env

# use special prod config
COPY apps/parcels-n-at/next.config.prod.js /app/apps/parcels-n-at/next.config.js
RUN turbo prune --scope=parcels-n-at --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
RUN pnpm install

# Build the project
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json
COPY --from=builder /app/apps/parcels-n-at/.env.local /app/apps/parcels-n-at/.env.local
COPY --from=builder /app/.env /app/.env

RUN turbo run build --filter=parcels-n-at

# use alpine as the thinest image
FROM alpine AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer /app/apps/parcels-n-at/next.config.js .
COPY --from=installer /app/apps/parcels-n-at/package.json .

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /app/apps/parcels-n-at/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/parcels-n-at/.next/static ./apps/parcels-n-at/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/parcels-n-at/public ./apps/parcels-n-at/public

CMD node apps/parcels-n-at/server.js