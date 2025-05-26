# Use Node.js 20 as base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies first for better caching
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies (including devDependencies for building)
RUN npm install --include=dev

# Install NestJS CLI globally
RUN npm install -g @nestjs/cli

# Copy the rest of the application
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the application
RUN npm run build

# Expose the application port
EXPOSE 3000

# Command to run the application with hot-reloading
CMD ["npm", "run", "start:dev"]