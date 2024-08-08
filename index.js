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

// for development only 
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || origin.startsWith('http://localhost') || origin.startsWith('https://your-allowed-domain.com')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
}));

// for production
// app.use(cors({
//   origin: [process.env.ORIGIN],
//   methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
//   credentials: true,
// }));

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