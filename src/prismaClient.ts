import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

try {
  await prisma.$connect();
  console.log("Connected to the database");
} catch (error) {
  console.warn("Failed to connect to the database, is it running?");
}

export default prisma;
