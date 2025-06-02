# Multi-stage Dockerfile for NestJS application

# Stage 1: Development dependencies
FROM node:22-alpine AS development-dependencies
WORKDIR /app
COPY package*.json ./
# Use npm install if package-lock.json doesn't exist, otherwise use npm ci
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

# Stage 2: Build stage
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
COPY --from=development-dependencies /app/node_modules ./node_modules
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the application
RUN npm run build

# Stage 3: Production dependencies
FROM node:22-alpine AS production-dependencies
WORKDIR /app
COPY package*.json ./
# Use npm install if package-lock.json doesn't exist, otherwise use npm ci
RUN if [ -f package-lock.json ]; then npm ci --omit=dev; else npm install --omit=dev; fi

# Stage 4: Production image
FROM node:22-alpine AS production
WORKDIR /app

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create a non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001

# Copy package.json and production dependencies
COPY package*.json ./
COPY --from=production-dependencies /app/node_modules ./node_modules

# Copy built application
COPY --from=build /app/dist ./dist

# Copy Prisma schema and generated client
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma

# Change ownership to non-root user
RUN chown -R nestjs:nodejs /app
USER nestjs

# Expose the port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node dist/health-check.js || exit 1

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/main"]
