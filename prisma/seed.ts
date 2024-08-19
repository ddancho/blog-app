import { PrismaClient } from "@prisma/client";
import { categories } from "./categories";

const prisma = new PrismaClient();

async function main() {
  // categories
  console.log("start seeding initial categories...");

  for (const category of categories) {
    const newCategory = await prisma.category.create({
      data: category,
    });

    console.log(`created ${newCategory.slug} category`);
  }

  console.log("end seeding categories...");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
