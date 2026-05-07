import { db } from './db';

export const getCompetitions = async () => {
  return await db.getAllAsync(
    'SELECT * FROM competitions'
  );
};

export const getMatchesByCompetition = async (
  competitionId: number
) => {
  return await db.getAllAsync(
    'SELECT * FROM matches WHERE competitionId = ?',
    [competitionId]
  );
};

export const getPronosticsByMatch = async (
  matchId: number
) => {
  return await db.getAllAsync(
    'SELECT * FROM pronostics WHERE matchId = ?',
    [matchId]
  );
};