import express from 'express';
import cors from 'cors';
import { routes } from './routes/registry.js';
import './routes/index.js';
import { errorHandler } from './lib/http.js';

export const app = express();

app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (req, res) => res.json({ status: 'ok', modules: routes.map(([path]) => path) }));

for (const [path, router] of routes) app.use(`/api/${path}`, router);

app.use((req, res) => res.status(404).json({ error: 'Route not found' }));
app.use(errorHandler);
