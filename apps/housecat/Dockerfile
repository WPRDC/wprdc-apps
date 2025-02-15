FROM node:18-alpine AS alpine

# setup pnpm on the alpine base
FROM alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN pnpm install turbo --global

FROM base AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk update

# Set working directory
WORKDIR /app
COPY . .

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
RUN turbo run build --filter=housecat

# use alpine as the thinest image
FROM alpine AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer /app/apps/housecat/next.config.js .
COPY --from=installer /app/apps/housecat/package.json .

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /app/apps/housecat/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/housecat/.next/static ./apps/housecat/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/housecat/public ./apps/housecat/public

CMD node apps/housecat/server.js