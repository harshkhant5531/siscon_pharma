import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import authRoutes from "./routes/auth";
import productRoutes from "./routes/products";
import invoiceRoutes from "./routes/invoices";
import uploadRoutes from "./routes/upload";
import { authMiddleware } from "./middleware/auth";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'http://localhost:8080',
    'https://siscon-pharma.vercel.app',
    /\.vercel\.app$/,  // Allow all Vercel preview deployments
  ],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check (public)
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    message: "Siscon Pharma API is running!",
    timestamp: new Date().toISOString(),
  });
});

// Public routes
app.use("/api/auth", authRoutes);

// Protected routes — require login
app.use("/api/products", authMiddleware, productRoutes);
app.use("/api/invoices", authMiddleware, invoiceRoutes);
app.use("/api/upload", authMiddleware, uploadRoutes);

// Serve uploaded files temporarily
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Global error handler
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`🚀 Siscon Pharma API running on http://localhost:${PORT}`);
  console.log(`🔐 Auth API:      http://localhost:${PORT}/api/auth`);
  console.log(`📦 Products API:  http://localhost:${PORT}/api/products (protected)`);
  console.log(`🧾 Invoices API:  http://localhost:${PORT}/api/invoices (protected)`);
  console.log(`📤 Upload API:    http://localhost:${PORT}/api/upload (protected)`);
});
