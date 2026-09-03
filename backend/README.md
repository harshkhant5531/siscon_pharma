# Siscon Pharma Backend

## Tech Stack
- **Runtime**: Node.js + Express
- **ORM**: Prisma
- **Database**: Supabase PostgreSQL
- **Image CDN**: Cloudinary
- **File Storage**: Supabase Storage (for documents/invoices)

## Setup
```bash
cd backend
npm install
npx prisma generate
npx prisma db push
npx ts-node prisma/seed.ts  # Seed initial products
```

## Running
```bash
npm run dev    # Development with hot-reload
npm start      # Production
```

## API Endpoints

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | List all products |
| GET | `/api/products/:id` | Get single product |
| POST | `/api/products` | Create product (multipart/form-data with optional `image` file) |
| PUT | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Delete product |

### Invoices
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/invoices` | List all invoices |
| GET | `/api/invoices/:id` | Get single invoice |
| POST | `/api/invoices` | Create invoice (JSON body) |
| DELETE | `/api/invoices/:id` | Delete invoice |

### Upload
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/upload/image` | Upload image to Cloudinary |
| DELETE | `/api/upload/image/:publicId` | Delete image from Cloudinary |

### Health
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |

## Environment Variables
See `.env` for required variables.
