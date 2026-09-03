import { Router, Request, Response } from 'express';
import nodemailer from 'nodemailer';

const router = Router();

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const TO_EMAIL = process.env.TO_EMAIL || 'sisconpharma14@gmail.com';

router.post('/', async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, countryCode, phone, message } = req.body || {};

    if (!firstName || !lastName || !email || !phone || !message) {
      return res.status(400).json({ error: 'Please complete all required fields.' });
    }

    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
      return res.status(500).json({
        error:
          'Email sending is not configured on the server. Add SMTP environment variables to enable direct email delivery.',
      });
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    const fullName = `${firstName} ${lastName}`.trim();
    const subject = `New enquiry from Siscon Pharma website`;
    const html = `
      <h2>New contact enquiry</h2>
      <p><strong>Name:</strong> ${fullName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${countryCode} ${phone}</p>
      <p><strong>Message:</strong></p>
      <div>${message.replace(/\n/g, '<br />')}</div>
    `;

    await transporter.sendMail({
      from: SMTP_USER,
      to: TO_EMAIL,
      replyTo: email,
      subject,
      html,
    });

    return res.status(200).json({ success: true, message: 'Message sent successfully.' });
  } catch (error: any) {
    console.error('Contact email error:', error);
    return res.status(500).json({
      error: error?.message || 'Failed to send message. Please try again later.',
    });
  }
});

export default router;
