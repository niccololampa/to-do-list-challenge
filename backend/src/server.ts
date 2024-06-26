import express from 'express';
import dotenv from 'dotenv';
import routes from './routes';
import logger from 'morgan';
import { createServer } from 'http';
import cors from 'cors';
import db from './db/db';

dotenv.config();
const app = express();
const server = createServer(app);

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.static('src/public'));

const PORT = process.env.PORT;

app.use('/', routes);

server
  .listen(PORT, () => {
    console.log('Server running at PORT: ', PORT);
  })
  .on('error', (error) => {
    throw new Error(error.message);
  });

// Close the database connection when the process exits
process.on('SIGINT', () => {
  db.close((err: Error | null) => {
    if (err) {
      console.error('Error closing database:', err.message);
    }
    console.log('Database connection closed.');
    process.exit(0);
  });
});
