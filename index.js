import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import authRoutes from './routes/AuthRoutes.js';

dotenv.config();


const app = express();
const port = process.env.PORT || 3000
const databaseUrl = process.env.DATABASE_URL

app.use(cors({
  origin: [process.env.ORIGIN],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRoutes);


app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

mongoose
  .connect(databaseUrl)
  .then(() => console.log('connected to database'))
  .catch((err) => console.log('error connecting to database', err))