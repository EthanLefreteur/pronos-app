export type Competition = {
  id: number;
  name: string;
  image?: string;
  startDate: string;
  endDate: string;
  finished: number;
};

export type Team = {
  id: number;
  name: string;
  logo?: string;
};

export type Match = {
  id: number;
  competitionId: number;
  homeTeamId: number;
  awayTeamId: number;
  name?: string;
  status: string;

  halftimeHome?: number;
  halftimeAway?: number;

  finalHome?: number;
  finalAway?: number;
};

export type Pronostiqueur = {
  id: number;
  name: string;
  avatar?: string;
};

export type Pronostic = {
  id: number;
  matchId: number;
  pronostiqueurId: number;

  halftimeHome: number;
  halftimeAway: number;

  finalHome: number;
  finalAway: number;
};