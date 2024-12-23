import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

try {
  await prisma.$connect();
  console.log("Connected to the database");
} catch {
	console.warn("\x1b[31m%s\x1b[0m", "⮚ Failed to connect to the database, is it running?");
}

export default prisma;
