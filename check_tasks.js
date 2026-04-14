const { PrismaClient } = require('@prisma/client');

async function main() {
  const prisma = new PrismaClient();
  const tasks = await prisma.task.findMany({});
  console.log('Todas las tareas en DB:', JSON.stringify(tasks, null, 2));
  await prisma.$disconnect();
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
