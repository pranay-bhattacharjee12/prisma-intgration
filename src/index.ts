import { prisma } from "./db";
import { PrismaClient } from "./generated/prisma/client.js";

const prisma = new PrismaClient();

//create a new user
async function main() {
  const user = await prisma.user.create({
    data: {
      name: "Pranay",
      email: "pranay@example.com",
    },
  });

  console.log(user);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });