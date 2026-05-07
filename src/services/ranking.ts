export const computePoints = (
  pronostic: any,
  match: any
) => {
  let points = 0;

  const realWinner = getWinner(
    match.finalHome,
    match.finalAway
  );

  const predictedWinner = getWinner(
    pronostic.finalHome,
    pronostic.finalAway
  );

  if (realWinner === 'draw' && predictedWinner === 'draw') {
    points += 3;
  }
  else if (realWinner === predictedWinner) {
    points += 2;
  }
  else {
    points -= 1;
  }

  if (
    pronostic.halftimeHome === match.halftimeHome &&
    pronostic.halftimeAway === match.halftimeAway
  ) {
    points += 1;
  }

  const halftimeDelta =
    Math.abs(pronostic.halftimeHome - match.halftimeHome) +
    Math.abs(pronostic.halftimeAway - match.halftimeAway);

  if (halftimeDelta >= 3) {
    points -= 1;
  }

  if (
    pronostic.finalHome === match.finalHome &&
    pronostic.finalAway === match.finalAway
  ) {
    points += 2;
  }

  const finalDelta =
    Math.abs(pronostic.finalHome - match.finalHome) +
    Math.abs(pronostic.finalAway - match.finalAway);

  if (finalDelta >= 5) {
    points -= 1;
  }

  return points;
};

const getWinner = (
  home: number,
  away: number
) => {
  if (home > away) return 'home';
  if (away > home) return 'away';

  return 'draw';
};