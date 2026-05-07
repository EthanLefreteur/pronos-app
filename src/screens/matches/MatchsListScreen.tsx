import { saveLastScreen } from '../../services/navigationStorage';
import { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import {
  FAB,
  Portal,
  Modal,
  Button,
  TextInput,
} from 'react-native-paper';

import MatchCard from '../../components/MatchCard';
import { db } from '../../database/db';

export default function MatchsListScreen({ route, navigation }: any) {
  const { competitionId } = route.params;

  const [matches, setMatches] = useState<any[]>([]);
  const [visible, setVisible] = useState(false);

  const [name, setName] = useState('');

  useEffect(() => {
    loadMatches();
  }, []);

  const loadMatches = async () => {
    const result = await db.getAllAsync(
      'SELECT * FROM matches WHERE competitionId = ?',
      [competitionId]
    );

    setMatches(result);
  };

  const addMatch = async () => {
    await db.runAsync(
      `INSERT INTO matches (
        competitionId,
        status,
        name
      ) VALUES (?, ?, ?)`,
      [competitionId, 'À venir', name]
    );

    setVisible(false);
    setName('');

    loadMatches();
  };

  const deleteMatch = async (id: number) => {
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
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MatchCard
            match={item}
            onDelete={() => deleteMatch(item.id)}
            onPress={() => {
              saveLastScreen(
                'MatchDetails',
                {
                  matchId: item.id,
                }
              );

              navigation.navigate('MatchDetails', {
                matchId: item.id,
              });
            }
            }
          />
        )}
      />

      <Portal>
        <Modal
          visible={visible}
          onDismiss={() => setVisible(false)}
          contentContainerStyle={{
            backgroundColor: 'white',
            margin: 20,
            padding: 20,
          }}
        >
          <TextInput
            label="Nom du match"
            value={name}
            onChangeText={setName}
          />

          <Button
            mode="contained"
            style={{ marginTop: 16 }}
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