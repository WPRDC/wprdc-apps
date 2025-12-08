FROM node:24-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN apk update
RUN apk add --no-cache libc6-compat

RUN npm install -g corepack@latest
RUN corepack enable
RUN pnpm install turbo --global

WORKDIR /app

FROM base AS prepare
RUN pnpm install turbo --global

COPY . .
COPY .env.local .env.local

RUN turbo prune parcels-n-at --docker

FROM base AS builder
# First install the dependencies (as they change less often)
COPY --from=prepare /app/out/json/ .
RUN pnpm install
# Build the project
COPY --from=prepare /app/out/full/ .

RUN turbo run build --filter=parcels-n-at

FROM base AS runner
# Don't run production as root for security reasons
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=builder --chown=nextjs:nodejs /app/apps/parcels-n-at/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/parcels-n-at/.next/static ./apps/parcels-n-at/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/parcels-n-at/public ./apps/parcels-n-at/public

CMD node apps/parcels-n-at/server.js