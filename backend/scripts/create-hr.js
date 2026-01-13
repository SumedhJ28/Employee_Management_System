const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('123456', 10);

  await prisma.user.create({
    data: {
      email: 'hr@company.com',
      password: passwordHash,
      role: 'HR',
    },
  });

  console.log('✅ HR user created successfully');
}

main()
  .catch((err) => {
    console.error(err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
