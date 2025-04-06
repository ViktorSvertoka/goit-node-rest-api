import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import 'dotenv/config';
import contactsRouter from './routes/contactsRouter.js';
import { sequelize, connectDB } from './db/Sequelize.js';

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

app.use('/api/contacts', contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

const { PORT = 3000 } = process.env;
const port = Number(PORT);

connectDB();

app.listen(port, () => {
  console.log(`Server is running. Use our API on port: ${port}`);
});
