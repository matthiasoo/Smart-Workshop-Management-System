import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const globalForPrisma = globalThis;

let prismaInstance;

if (!globalForPrisma.prisma) {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const adapter = new PrismaPg(pool);
    prismaInstance = new PrismaClient({ adapter });
} else {
    prismaInstance = globalForPrisma.prisma;
}

export const prisma = prismaInstance;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;