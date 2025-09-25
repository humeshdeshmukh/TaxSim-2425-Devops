# devops/docker/Dockerfile
# Production multi-stage build for Next.js app (TaxSim)
FROM node:20-bullseye AS deps
WORKDIR /app
COPY package*.json ./
# Install with legacy peer deps
RUN npm install --legacy-peer-deps --silent

FROM node:20-bullseye AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-bullseye AS runner
WORKDIR /app
ENV NODE_ENV=production
# copy minimal files
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s CMD curl -f http://localhost:3000/_next/static/ || exit 1
CMD ["npm","run","start"]



