# Stage 1: Build the backend
FROM node:20-alpine AS build

WORKDIR /app

# Install openssl for Prisma
RUN apk add --no-cache openssl

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install all dependencies (including dev)
RUN npm install

# Copy application code
COPY . .

# Generate Prisma client and build typescript code
RUN npx prisma generate
RUN npm run build
RUN test -f dist/prisma/seed.js && test -f dist/server.js

# Stage 2: Production environment
FROM node:20-alpine

WORKDIR /app

# Install openssl for Prisma
RUN apk add --no-cache openssl

# Copy package files and prisma schema
COPY package*.json ./
COPY prisma ./prisma/

# Install production dependencies only
RUN npm install --omit=dev

# Generate Prisma client for the production environment
RUN npx prisma generate

# Copy built directory from builder stage
COPY --from=build /app/dist ./dist
RUN test -f dist/prisma/seed.js && test -f dist/server.js

# Expose the API port
EXPOSE 3000

# Declare env vars so Render can inject them at runtime
ENV NODE_ENV="production"
ENV PORT=10000

CMD ["sh", "-c", "npx prisma migrate deploy && npm run seed && npm start"]