FROM node:20-alpine

WORKDIR /app

# Install dependencies first for better caching
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies (including devDependencies for building)
RUN npm install --include=dev

# Install NestJS CLI globally
RUN npm install -g @nestjs/cli

# Generate Prisma client (but don't run migrations yet)
RUN npx prisma generate

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Expose the application port
EXPOSE 3000

# Command to run the application with hot-reloading
CMD ["sh", "-c", "npx prisma migrate dev --name update && npm run start:dev"]