import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();
const router = express.Router();

router.get('/', (_req: Request, res: Response) => {
  res.sendFile(path.resolve('public/index.html'));
});

export default router;
