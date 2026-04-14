const { PrismaClient } = require('@prisma/client');

async function main() {
  const prisma = new PrismaClient();
  const logs = await prisma.logs.findMany({
    orderBy: { timestamp: 'desc' },
    take: 5
  });
  console.log(JSON.stringify(logs, null, 2));
  await prisma.$disconnect();
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
