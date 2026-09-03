import { Router, Request, Response } from 'express';
import { prisma } from '../config/prisma';

const router = Router();

// GET /api/invoices — List all invoices
router.get('/', async (_req: Request, res: Response) => {
  try {
    const invoices = await prisma.invoice.findMany({
      orderBy: { date: 'desc' },
    });
    res.json(invoices);
  } catch (error) {
    console.error('Error fetching invoices:', error);
    res.status(500).json({ error: 'Failed to fetch invoices' });
  }
});

// GET /api/invoices/:id — Get single invoice
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const invoice = await prisma.invoice.findUnique({
      where: { id: req.params.id },
    });
    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }
    res.json(invoice);
  } catch (error) {
    console.error('Error fetching invoice:', error);
    res.status(500).json({ error: 'Failed to fetch invoice' });
  }
});

// POST /api/invoices — Create a new invoice
router.post('/', async (req: Request, res: Response) => {
  try {
    const invoice = await prisma.invoice.create({
      data: {
        invoiceId: req.body.invoiceId,
        date: req.body.date ? new Date(req.body.date) : new Date(),
        customer: req.body.customer,
        items: req.body.items,
        subtotal: parseFloat(req.body.subtotal),
        tax: parseFloat(req.body.tax),
        total: parseFloat(req.body.total),
        notes: req.body.notes || null,
        documentUrl: req.body.documentUrl || null,
      },
    });

    res.status(201).json(invoice);
  } catch (error) {
    console.error('Error creating invoice:', error);
    res.status(500).json({ error: 'Failed to create invoice' });
  }
});

// DELETE /api/invoices/:id — Delete an invoice
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const existing = await prisma.invoice.findUnique({ where: { id: req.params.id } });
    if (!existing) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    await prisma.invoice.delete({ where: { id: req.params.id } });
    res.json({ message: 'Invoice deleted successfully' });
  } catch (error) {
    console.error('Error deleting invoice:', error);
    res.status(500).json({ error: 'Failed to delete invoice' });
  }
});

export default router;
