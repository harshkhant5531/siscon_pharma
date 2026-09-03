import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Connecting to database...');
    await prisma.$connect();
    console.log('Successfully connected to Supabase PostgreSQL!');
    const products = await prisma.product.findMany();
    console.log('Products count:', products.length);
  } catch (err: any) {
    console.error('Connection error detail:', err.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
