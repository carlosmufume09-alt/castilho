import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando seed - Shells Fashion Elegance (Moçambique)...');

  try {
    // Criar admin
    await prisma.user.deleteMany({});
    const hashedPassword = await bcrypt.hash('123456', 10);
    await prisma.user.create({
      data: {
        email: 'admin@example.com',
        password: hashedPassword,
      },
    });
    console.log('✓ Admin criado: admin@example.com / 123456');

    // Criar loja
    await prisma.store.deleteMany({});
    await prisma.store.create({
      data: {
        name: 'Shells Fashion Elegance',
        description: 'A melhor loja de moda elegante de Moçambique',
        whatsapp: '+258879992762',
        phone: '847052762',
        email: 'shells@fashion.com',
        address: 'Khongolote, Maputo, Moçambique',
      },
    });
    console.log('✓ Loja criada');

    // Criar produtos (preços em Meticais - MT)
    await prisma.product.deleteMany({});
    const products = [
      {
        name: 'Blazer Premium',
        description: 'Blazer elegante em tecido premium, perfeito para ocasiões especiais',
        price: 4500.00,
        category: 'roupas',
        stock: 15,
      },
      {
        name: 'Vestido Elegante',
        description: 'Vestido sofisticado com design exclusivo para eventos formais',
        price: 5800.00,
        category: 'roupas',
        stock: 10,
      },
      {
        name: 'Bolsa Luxo',
        description: 'Bolsa de couro genuíno com acabamento premium',
        price: 3200.00,
        category: 'acessorios',
        stock: 20,
      },
      {
        name: 'Sapato Alto',
        description: 'Sapato de salto alto em couro italiano',
        price: 2800.00,
        category: 'sapatos',
        stock: 25,
      },
      {
        name: 'Colar Pérolas',
        description: 'Colar de pérolas naturais com fecho em ouro',
        price: 6500.00,
        category: 'acessorios',
        stock: 8,
      },
      {
        name: 'Calça Social',
        description: 'Calça social em tecido premium com corte alfaiataria',
        price: 2400.00,
        category: 'roupas',
        stock: 30,
      },
    ];

    for (const product of products) {
      await prisma.product.create({
        data: {
          ...product,
          image: '',
          active: true,
        },
      });
    }
    console.log('✓ 6 produtos criados (preços em Meticais - MT)');

    console.log('');
    console.log('='.repeat(50));
    console.log('SEED CONCLUÍDO COM SUCESSO!');
    console.log('='.repeat(50));
    console.log('Admin: admin@example.com | Senha: 123456');
    console.log('WhatsApp: +258 879 992 762');
    console.log('Local: Khongolote, Maputo, Moçambique');
    console.log('Moeda: Meticais (MT)');
    console.log('='.repeat(50));
  } catch (error) {
    console.error('Erro ao executar seed:', error);
    process.exit(1);
  }
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  });
