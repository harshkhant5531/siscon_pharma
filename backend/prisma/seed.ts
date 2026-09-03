import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const initialProducts = [
  {
    id: "meropenem-1gm",
    name: "Meropenem Injection",
    strength: "1gm",
    manufacturer: "Siscon Pharma",
    price: "₹1085",
    inStock: true,
    image: "/assets/mero.jpg",
    category: "Antibiotic Injections",
  },
  {
    id: "amoxicillin-clavulanate-1.2gm",
    name: "Amoxicillin & Potassium Clavulanate Injection",
    strength: "1.2 gm",
    manufacturer: "Siscon Pharma",
    price: "₹157", 
    inStock: true,
    image: "/assets/Amo.jpg",
    category: "Antibiotic Injections"
  },
  {
    id: "piperacillin-tazobactam-4.5gm",
    name: "Piperacillin & Tazobactam Injection",
    strength: "4.5gm",
    manufacturer: "Siscon Pharma",
    price: "₹447",
    inStock: true,
    image: "/assets/piper.jpg",
    category: "Antibiotic Injections",
  },
  {
    id: "pantoprazole-40mg",
    name: "Pantoprazole Injection",
    strength: "40mg",
    manufacturer: "Siscon Pharma",
    price: "₹57.48",
    inStock: true,
    image: "/assets/panto.jpg",
    category: "Gastrointestinal",
  },
  {
    id: "infibact-sb-1-5gm",
    name: "Cefoperazone & Sulbactam Injection IP",
    strength: "1.5 gm",
    manufacturer: "Siscon Pharma",
    price: "₹950",
    inStock: true,
    image: "/assets/Cefo.png",
    category: "Antibiotic Injections",
  },
  {
    id: "paracetamol-100ml",
    name: "Paracetamol Infusion IP",
    strength: "100ml",
    manufacturer: "Siscon Pharma",
    price: "₹547",
    inStock: true,
    image: "/assets/para.jpg",
    category: "Critical Care",
  },
  {
    id: "hydrocortisone-100mg",
    name: "Hydrocortisone Sodium Succinate Injection IP",
    strength: "100 mg",
    manufacturer: "Siscon Pharma",
    price: "₹47",
    inStock: true,
    image: "/assets/hydro.png",
    category: "Emergency Medicines",
  }
];

async function main() {
  console.log('Seeding initial products to Supabase PostgreSQL...');
  for (const prod of initialProducts) {
    await prisma.product.upsert({
      where: { id: prod.id },
      update: prod,
      create: prod,
    });
  }
  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
