import { PrismaClient } from '@prisma/client';
import bcryptjs from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Deletando admin antigo...');
  await prisma.user.deleteMany({ where: { email: 'admin@example.com' } });
  
  console.log('Criando novo admin...');
  const hashedPassword = await bcryptjs.hash('123456', 10);
  
  const user = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      password: hashedPassword,
    },
  });
  
  console.log('✓ Admin criado com sucesso!');
  console.log('Email: admin@example.com');
  console.log('Senha: 123456');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
