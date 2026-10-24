import "dotenv/config";
import { PrismaClient } from "./generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

export const prisma = new PrismaClient({ adapter });


/*

1.npm install --save-dev prisma@7
npm install @prisma/client@7 @prisma/adapter-pg@7 dotenv

2. Initialize Prisma (skip if you already have a prisma folder)
bash
npx prisma init --output ../app/generated/prisma

This creates prisma/schema.prisma, prisma.config.ts, and .env.

3. Set your database URL in .env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DBNAME"

Use your real connection string from Neon, Supabase, or your local/Docker Postgres.

4. Check prisma/schema.prisma
prisma
generator client {
  provider = "prisma-client"
  output   = "../app/generated/prisma"
}

datasource db {
  provider = "postgresql"
}

model User {
  id       Int    @id @default(autoincrement())
  email    String @unique
  name     String?
}

In Prisma 7, the url no longer goes in the schema. It goes in the config file in the next step.

5. Check prisma.config.ts (in the project root)
ts
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations" },
  datasource: { url: env("DATABASE_URL") },
});
6. Create the tables and generate the client
bash
npx prisma migrate dev --name init
npx prisma generate

In Prisma 7, migrate dev no longer runs generate for you, so run both. Afterward, you should see an app/generated/prisma folder.

7. Create the shared client in lib/prisma.ts
ts
import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
8. Use it in app/api/user/route.ts
ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const user = await prisma.user.findFirst();
  return NextResponse.json(user);
}

Delete the old import { PrismaClient } from "@prisma/client" and new PrismaClient() lines from this file.

*/