import express from 'express';
import { authMiddleware } from './auth.js';

const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
  // Sample dashboard data; replace with real queries later
  const stats = {
    users: 1,
    products: 42,
    inquiries: 10,
    lastLogin: new Date().toISOString(),
  };
  return res.json({ userId: req.user.sub, stats });
});

export default router;
