# Use Node 20 alpine for a lightweight image
FROM node:20-alpine

# Install openssl for Prisma
RUN apk add --no-cache openssl

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm install

# Generate Prisma client
RUN npx prisma generate

# Copy the rest of the application
COPY . .

# Expose the API port
EXPOSE 3000

# Use a shell script to run migrations and then the app
CMD ["sh", "-c", "npx prisma migrate deploy && npm run dev"]
