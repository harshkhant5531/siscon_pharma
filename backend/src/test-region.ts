import { PrismaClient } from '@prisma/client';

const regions = ['ap-south-1', 'eu-central-1', 'us-east-1', 'ap-southeast-1'];
const pass = 'r7vu83NL%2Bd%5EzvDq';
const projectRef = 'bdqzzdyphfwczowvaowd';

async function testRegions() {
  for (const r of regions) {
    const url = `postgresql://postgres.${projectRef}:${pass}@aws-0-${r}.pooler.supabase.com:6543/postgres?sslmode=require`;
    console.log(`Testing region ${r}...`);
    const prisma = new PrismaClient({ datasources: { db: { url } } });
    try {
      await prisma.$connect();
      console.log(`>>> SUCCESS CONNECTED TO REGION: ${r} <<<`);
      await prisma.$disconnect();
      return r;
    } catch (e: any) {
      console.log(`Failed ${r}:`, e.message.substring(0, 150));
      await prisma.$disconnect();
    }
  }
}

testRegions();
