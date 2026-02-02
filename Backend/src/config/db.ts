import { PrismaClient } from "../../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString =
  process.env.DATABASE_URL! ||
  "postgres://postgres:postgres@localhost:6543/Coding-arena";
const adapter = new PrismaPg({ connectionString });
export const prisma = new PrismaClient({ adapter });
