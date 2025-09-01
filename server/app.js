import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import jobRoutes from './routes/job.js';
import appRoutes from './routes/application.js';
import messageRoutes from './routes/message.js';
import { notFound, errorHandler } from './middleware/error.js';


dotenv.config();
const app = express();


app.use(cors({ origin: process.env.CLIENT_URL || '*', credentials: true }));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Static uploads
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', appRoutes);
app.use('/api/messages', messageRoutes);


app.get('/api/health', (_req, res) => res.json({ ok: true }));


// Error handlers
app.use(notFound);
app.use(errorHandler);


export default app;