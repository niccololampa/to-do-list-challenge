import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./database.db', (err: Error | null) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    db.serialize(() => {
      db.run(`CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        taskName TEXT NOT NULL,
        completed boolean NOT NULL DEFAULT false
      )`);
    });
  }
});

export default db;
