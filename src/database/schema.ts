import { db } from './db';

export const initDatabase = async () => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS competitions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      image TEXT,
      startDate TEXT,
      endDate TEXT,
      finished INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS teams (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      logo TEXT
    );

    CREATE TABLE IF NOT EXISTS pronostiqueurs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      avatar TEXT
    );

    CREATE TABLE IF NOT EXISTS matches (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      competitionId INTEGER,
      homeTeamId INTEGER,
      awayTeamId INTEGER,
      name TEXT,
      status TEXT,
      halftimeHome INTEGER,
      halftimeAway INTEGER,
      finalHome INTEGER,
      finalAway INTEGER
    );

    CREATE TABLE IF NOT EXISTS pronostics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      matchId INTEGER,
      pronostiqueurId INTEGER,
      halftimeHome INTEGER,
      halftimeAway INTEGER,
      finalHome INTEGER,
      finalAway INTEGER
    );
  `);
};