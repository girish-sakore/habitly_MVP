import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    "DATABASE_URL is not set. Define it in .env so Prisma can connect via the pg adapter."
  );
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  pool: Pool | undefined;
  prismaCleanupRegistered: boolean | undefined;
};

const pool =
  globalForPrisma.pool ??
  new Pool({
    connectionString,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.pool = pool;
}

const adapter = new PrismaPg(pool);

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

if (process.env.NODE_ENV !== "production" && !globalForPrisma.prismaCleanupRegistered) {
  let cleanedUp = false;
  const cleanup = async () => {
    if (cleanedUp) return;
    cleanedUp = true;
    await prisma.$disconnect();
    await pool.end();
  };

  process.once("SIGINT", () => void cleanup());
  process.once("SIGTERM", () => void cleanup());
  globalForPrisma.prismaCleanupRegistered = true;
}
