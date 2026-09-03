import { Router, Request, Response } from 'express';
import { upload } from '../middleware/upload';
import cloudinary from '../config/cloudinary';
import fs from 'fs';

const router = Router();

// POST /api/upload/image — Upload an image to Cloudinary
router.post('/image', upload.single('file'), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const folder = req.body.folder || 'siscon-pharma/general';

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder,
      transformation: [{ quality: 'auto', fetch_format: 'auto' }],
    });

    // Clean up local temp file
    fs.unlinkSync(req.file.path);

    res.json({
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

// DELETE /api/upload/image/:publicId — Delete an image from Cloudinary
router.delete('/image/:publicId', async (req: Request, res: Response) => {
  try {
    const result = await cloudinary.uploader.destroy(req.params.publicId);
    res.json({ result: result.result });
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ error: 'Failed to delete image' });
  }
});

export default router;
