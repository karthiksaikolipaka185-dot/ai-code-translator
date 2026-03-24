import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import { notFound as notFoundHandler, errorHandler } from './middleware/error.middleware.js';
import 'dotenv/config';

const app = express();

// Enable CORS
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
}));

// Parse JSON payloads
app.use(express.json());

// Main Router API Prefix
app.use('/api', routes);

// Route Fallback and Error Handling
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
