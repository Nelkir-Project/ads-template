import dotenv from 'dotenv';

// Load .env FIRST before any other imports
dotenv.config();

import express from 'express';
import cors from 'cors';
import { webhookRoutes } from './routes/webhooks.js';
import { smsRoutes } from './routes/sms.js';
import { calendlyRoutes } from './routes/calendly.js';
import { calendlyWebhooksRoutes } from './routes/calendly-webhooks.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/webhooks', webhookRoutes);
app.use('/api/sms', smsRoutes);
app.use('/api/auth/calendly', calendlyRoutes);
app.use('/api/calendly-webhooks', calendlyWebhooksRoutes);

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Admin password verification endpoint
app.post('/api/admin/verify', (req, res) => {
  const { password } = req.body;
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  
  if (password === adminPassword) {
    res.json({ valid: true });
  } else {
    res.status(401).json({ valid: false, error: 'Invalid password' });
  }
});



app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📅 Calendly webhook endpoint: http://localhost:${PORT}/api/webhooks/calendly`);
});

export default app;
