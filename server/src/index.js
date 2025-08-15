import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import config from './config.js';
import { sequelize } from './models/index.js';
import { ensureDatabaseExists, seedAdminUser } from './utils/initDb.js';
import authRoutes from './routes/auth.js';
import dashboardRoutes from './routes/dashboard.js';

dotenv.config();

const app = express();

// Security headers
app.use(helmet());

// CORS whitelist
app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true);
      const ok = config.corsOrigins.includes(origin);
      cb(ok ? null : new Error('Not allowed by CORS'), ok);
    },
    credentials: true,
  })
);

// Rate limit for auth endpoints
const authLimiter = rateLimit({
  windowMs: config.security.rateLimit.windowMs,
  max: config.security.rateLimit.max,
});

app.use(express.json());

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/dashboard', dashboardRoutes);

const PORT = config.server.port;

async function start() {
  try {
    // Ensure DB exists only when allowed (true by default in dev)
    if (config.flags.allowDbCreate) {
      await ensureDatabaseExists();
    }

  await sequelize.authenticate();
  // Note: schema is managed via migrations; do not sync in production

    if (config.flags.seedAdmin) {
      await seedAdminUser();
    }

    app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

start();
