import { saveLastScreen } from '../../services/navigationStorage';
import { useEffect, useState } from 'react';

import {
  FlatList,
  View,
} from 'react-native';

import {
  FAB,
  Portal,
  Modal,
  Button,
  TextInput,
} from 'react-native-paper';

import MatchCard from '../../components/MatchCard';

import { db } from '../../database/db';

export default function MatchsListScreen({
  route,
  navigation,
}: any) {

  const { competitionId } = route.params;

  const [matches, setMatches] =
    useState<any[]>([]);

  const [teams, setTeams] =
    useState<any[]>([]);

  const [visible, setVisible] =
    useState(false);

  const [name, setName] =
    useState('');

  const [homeTeamId, setHomeTeamId] =
    useState('');

  const [awayTeamId, setAwayTeamId] =
    useState('');

  useEffect(() => {
    loadMatches();
    loadTeams();
  }, []);

  const loadMatches = async () => {

    const result = await db.getAllAsync(
      `
      SELECT
        matches.*,

        home.name as homeName,
        away.name as awayName

      FROM matches

      LEFT JOIN teams home
        ON home.id = matches.homeTeamId

      LEFT JOIN teams away
        ON away.id = matches.awayTeamId

      WHERE competitionId = ?
      `,
      [competitionId]
    );

    setMatches(result);
  };

  const loadTeams = async () => {

    const result = await db.getAllAsync(
      'SELECT * FROM teams'
    );

    setTeams(result);
  };

  const addMatch = async () => {

    if (!homeTeamId || !awayTeamId) {
      return;
    }

    if (homeTeamId === awayTeamId) {
      return;
    }

    await db.runAsync(
      `
      INSERT INTO matches (
        competitionId,
        homeTeamId,
        awayTeamId,
        status,
        name
      )

      VALUES (?, ?, ?, ?, ?)
      `,
      [
        competitionId,
        Number(homeTeamId),
        Number(awayTeamId),
        'À venir',
        name,
      ]
    );

    setVisible(false);

    setName('');
    setHomeTeamId('');
    setAwayTeamId('');

    loadMatches();
  };

  const deleteMatch = async (
    id: number
  ) => {

    await db.runAsync(
      'DELETE FROM matches WHERE id = ?',
      [id]
    );

    loadMatches();
  };

  return (
    <View style={{ flex: 1 }}>

      <FlatList
        data={matches}
        keyExtractor={(item) =>
          item.id.toString()
        }
        renderItem={({ item }) => (

          <MatchCard
            match={item}
            onDelete={() =>
              deleteMatch(item.id)
            }
            onPress={() => {

              saveLastScreen(
                'MatchDetails',
                {
                  matchId: item.id,
                }
              );

              navigation.navigate(
                'MatchDetails',
                {
                  matchId: item.id,
                }
              );
            }}
          />

        )}
      />

      <Portal>

        <Modal
          visible={visible}
          onDismiss={() =>
            setVisible(false)
          }
          contentContainerStyle={{
            backgroundColor: 'white',
            margin: 20,
            padding: 20,
            borderRadius: 12,
          }}
        >

          <TextInput
            label="Nom du match"
            value={name}
            onChangeText={setName}
            style={{
              marginBottom: 16,
            }}
          />

          <TextInput
            label="ID équipe domicile"
            value={homeTeamId}
            onChangeText={setHomeTeamId}
            keyboardType="numeric"
            style={{
              marginBottom: 16,
            }}
          />

          <TextInput
            label="ID équipe extérieur"
            value={awayTeamId}
            onChangeText={setAwayTeamId}
            keyboardType="numeric"
            style={{
              marginBottom: 16,
            }}
          />

          <View
            style={{
              marginBottom: 20,
            }}
          >

            {teams.map((team) => (
              <Button
                key={team.id}
                mode="outlined"
                style={{
                  marginBottom: 8,
                }}
              >
                {team.id} - {team.name}
              </Button>
            ))}

          </View>

          <Button
            mode="contained"
            onPress={addMatch}
          >
            Ajouter
          </Button>

        </Modal>

      </Portal>

      <FAB
        icon="plus"
        style={{
          position: 'absolute',
          right: 16,
          bottom: 16,
        }}
        onPress={() => setVisible(true)}
      />

    </View>
  );
}