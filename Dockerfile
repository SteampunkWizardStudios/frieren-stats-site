# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /frieren-stats-site

# Copy package.json and package-lock.json
COPY package.json ./
COPY package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Run Prisma generate, migrate and start the Next.js application
CMD ["sh", "-c", "npx prisma generate && npx prisma migrate deploy && npm run dev"]