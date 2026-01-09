import { Product } from "@/components/ProductCard";

export const products: Product[] = [
  {
    id: "meropenem-1gm",
    name: "Meropenem Injection",
    strength: "1gm",
    manufacturer: "Siscon Pharma",
    price: "₹1085",
    inStock: true,
    image: "\\assets\\mero.jpg",
    category: "Antibiotic Injections",
  },
  // https://images.unsplash.com/photo-1585435557343-3b092031a831?w=400&h=400&fit=crop
 {
    "id": "amoxicillin-clavulanate-1.2gm",
    "name": "Amoxicillin & Potassium Clavulanate Injection",
    "strength": "1.2 gm",
    "manufacturer": "Siscon Pharma",
    "price": "₹157", 
    "inStock": true,
    "image": "\\assets\\Amo.jpg",
    "category": "Antibiotic Injections"
},
  {
    id: "piperacillin-tazobactam-4.5gm",
    name: "Piperacillin & Tazobactam Injection",
    strength: "4.5gm",
    manufacturer: "Siscon Pharma",
    price: "₹447",
    inStock: true,
    image: "\\assets\\piper.jpg",
    category: "Antibiotic Injections",
  },
  // https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop
  {
    id: "pantoprazole-40mg",
    name: "Pantoprazole Injection",
    strength: "40mg",
    manufacturer: "Siscon Pharma",
    price: "₹57.48",
    inStock: true,
    image: "\\assets\\panto.jpg",
    category: "Gastrointestinal",
  },
  // https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&h=400&fit=crop
{
  id: "infibact-sb-1-5gm",
  name: "Cefoperazone & Sulbactam Injection IP",
  strength: "1.5 gm",
  manufacturer: "Siscon Pharma",
  price: "₹950",
  inStock: true,
  image: "\\assets\\Cefo.png",
  category: "Antibiotic Injections",
},
  {
    id: "paracetamol-100ml",
    name: "Paracetamol Infusion IP",
    strength: "100ml",
    manufacturer: "Siscon Pharma",
    price: "₹547",
    inStock: true,
    image: "\\assets\\para.jpg",
    category: "Critical Care",
  },
  // https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=400&fit=crop
{
  id: "hydrocortisone-100mg",
  name: "Hydrocortisone Sodium Succinate Injection IP",
  strength: "100 mg",
  manufacturer: "Siscon Pharma",
  price: "₹47",
  inStock: true,
  image: "\\assets\\hydro.png",
  category: "Emergency Medicines",
 
},
  // {
  //   id: "ceftriaxone-1gm",
  //   name: "Ceftriaxone Injection",
  //   strength: "1gm",
  //   manufacturer: "Siscon Pharma",
  //   price: "₹75",
  //   inStock: true,
  //   image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400&h=400&fit=crop",
  //   category: "Antibiotic Injections",
  // },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find((product) => product.id === id);
};
