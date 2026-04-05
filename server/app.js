import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import { notFound as notFoundHandler, errorHandler } from './middleware/error.middleware.js';
import 'dotenv/config';

const app = express();

// Enable CORS
const allowedOrigins = [
  'http://localhost:5173',
  'https://ai-code-translator-sopg.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Parse JSON payloads
app.use(express.json());

// Main Router API Prefix
app.use('/api', routes);

// Route Fallback and Error Handling
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
