import { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { Text, Card } from 'react-native-paper';

import { db } from '../../database/db';
import { computePoints } from '../../services/ranking';

export default function CompetitionRankingScreen({ route }: any) {
  const { competitionId } = route.params;

  const [ranking, setRanking] = useState<any[]>([]);

  useEffect(() => {
    loadRanking();
  }, []);

  const loadRanking = async () => {
    const matches = await db.getAllAsync(
      'SELECT * FROM matches WHERE competitionId = ?',
      [competitionId]
    );

    const pronostics = await db.getAllAsync(
      'SELECT * FROM pronostics'
    );

    const pronostiqueurs = await db.getAllAsync(
      'SELECT * FROM pronostiqueurs'
    );

    const scores: any = {};

    pronostics.forEach((p: any) => {
      const match = matches.find((m: any) => m.id === p.matchId);

      if (!match) return;

      const points = computePoints(p, match);

      if (!scores[p.pronostiqueurId]) {
        scores[p.pronostiqueurId] = 0;
      }

      scores[p.pronostiqueurId] += points;
    });

    const rankingArray = pronostiqueurs.map((p: any) => ({
      ...p,
      points: scores[p.id] || 0,
    }));

    rankingArray.sort((a: any, b: any) => b.points - a.points);

    setRanking(rankingArray);
  };

  return (
    <FlatList
      data={ranking}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Card style={{ margin: 10 }}>
          <Card.Content>
            <Text variant="titleMedium">
              {item.name}
            </Text>

            <Text>
              {item.points} points
            </Text>
          </Card.Content>
        </Card>
      )}
    />
  );
}