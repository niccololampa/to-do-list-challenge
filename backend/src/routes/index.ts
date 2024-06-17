import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();
const router = express.Router();

import db from '../db/db';
// get all
router.get('/tasks', (_req: Request, res: Response) => {
  db.all('SELECT * FROM tasks', [], (err: Error | null, rows: any[]) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

router.post('/tasks', (req: Request, res: Response) => {
  const { taskName } = req.body;
  db.run('INSERT INTO tasks (taskName) VALUES (?)', [taskName], function (err: Error | null) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID, taskName, completed: false });
  });
});

// update
router.put('/tasks/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { taskName, completed } = req.body;
  db.run(
    'UPDATE tasks SET taskName = ?, completed = ? WHERE id = ?',
    [taskName, completed, id],
    function (err: Error | null) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({ taskName, completed });
    }
  );
});

// delete

router.delete('/tasks/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  db.run('DELETE FROM tasks WHERE id = ?', [id], function (err: Error | null) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ deletedID: this.changes });
  });
});

export default router;
