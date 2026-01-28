# ---- Base image ----
FROM node:20-alpine AS base

# ---- Set working directory ----
WORKDIR /app

# ---- Copy dependency files first (for caching) ----
COPY package.json package-lock.json ./


# ---- Install dependencies ----
RUN npm ci

# ---- Copy rest of the app ----
COPY . .

# ---- Build the Astro app ----
RUN npm run build


# ---- Production image ----
FROM node:20-alpine AS runner

WORKDIR /app

# ---- Environment variables for Astro SSR ----
ENV HOST=0.0.0.0
ENV PORT=4321
ENV NODE_ENV=production

# ---- Copy only what is needed at runtime ----
COPY --from=base /app/dist ./dist
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package.json ./package.json

# ---- Expose Astro SSR port ----
EXPOSE 4321

# ---- Start the server ----
CMD ["node", "dist/server/entry.mjs"]

