import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import connectDB from './config/db.js';
import documentRoutes from './routes/document.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api', documentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
