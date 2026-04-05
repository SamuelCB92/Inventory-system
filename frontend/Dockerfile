FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Vite default port
EXPOSE 5173

# Run in development mode to allow HMR
CMD ["npm", "run", "dev", "--", "--host"]
