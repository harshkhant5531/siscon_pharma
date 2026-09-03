import { Router, Request, Response } from 'express';
import { prisma } from '../config/prisma';
import { upload } from '../middleware/upload';
import cloudinary from '../config/cloudinary';
import fs from 'fs';

const router = Router();

// GET /api/products — List all products
router.get('/', async (_req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// GET /api/products/:id — Get single product
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
    });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// POST /api/products — Create new product (with optional image upload to Cloudinary)
router.post('/', upload.single('image'), async (req: Request, res: Response) => {
  try {
    let imageUrl = req.body.image || null;
    const inStockValue = req.body.inStock;
    const parsedInStock =
      inStockValue === undefined ? true : inStockValue === true || inStockValue === 'true' || inStockValue === '1';

    // If a file was uploaded, push it to Cloudinary
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'siscon-pharma/products',
        transformation: [{ width: 800, height: 800, crop: 'limit', quality: 'auto' }],
      });
      imageUrl = result.secure_url;
      // Clean up local temp file
      fs.unlinkSync(req.file.path);
    }

    const product = await prisma.product.create({
      data: {
        name: req.body.name,
        strength: req.body.strength || null,
        manufacturer: req.body.manufacturer || 'Siscon Pharma',
        price: req.body.price || null,
        inStock: parsedInStock,
        // @ts-ignore
        quantity: req.body.quantity !== undefined ? parseInt(req.body.quantity, 10) : 0,
        image: imageUrl,
        category: req.body.category,
        expiryDate: req.body.expiryDate ? new Date(req.body.expiryDate) : null,
      },
    });

    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// PUT /api/products/:id — Update a product
router.put('/:id', upload.single('image'), async (req: Request, res: Response) => {
  try {
    const existing = await prisma.product.findUnique({ where: { id: req.params.id } });
    if (!existing) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const inStockValue = req.body.inStock;
    const parsedInStock =
      inStockValue === undefined ? existing.inStock : inStockValue === true || inStockValue === 'true' || inStockValue === '1';

    let imageUrl = req.body.image || existing.image;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'siscon-pharma/products',
        transformation: [{ width: 800, height: 800, crop: 'limit', quality: 'auto' }],
      });
      imageUrl = result.secure_url;
      fs.unlinkSync(req.file.path);
    }

    const product = await prisma.product.update({
      where: { id: req.params.id },
      data: {
        name: req.body.name ?? existing.name,
        strength: req.body.strength ?? existing.strength,
        manufacturer: req.body.manufacturer ?? existing.manufacturer,
        price: req.body.price ?? existing.price,
        inStock: parsedInStock,
        // @ts-ignore
        quantity: req.body.quantity !== undefined ? parseInt(req.body.quantity, 10) : existing.quantity,
        image: imageUrl,
        category: req.body.category ?? existing.category,
        expiryDate: req.body.expiryDate ? new Date(req.body.expiryDate) : existing.expiryDate,
      },
    });

    res.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// DELETE /api/products/:id — Delete a product
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const existing = await prisma.product.findUnique({ where: { id: req.params.id } });
    if (!existing) {
      return res.status(404).json({ error: 'Product not found' });
    }

    await prisma.product.delete({ where: { id: req.params.id } });
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

export default router;
