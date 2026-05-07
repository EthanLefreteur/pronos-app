import { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import {
  Card,
  Text,
  FAB,
  Portal,
  Modal,
  TextInput,
  Button,
} from 'react-native-paper';

import { db } from '../../database/db';

export default function MatchDetailsScreen({ route }: any) {
  const { matchId } = route.params;

  const [match, setMatch] = useState<any>(null);
  const [pronostics, setPronostics] = useState<any[]>([]);

  const [visible, setVisible] = useState(false);

  const [finalHome, setFinalHome] = useState('0');
  const [finalAway, setFinalAway] = useState('0');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const result = await db.getFirstAsync(
      'SELECT * FROM matches WHERE id = ?',
      [matchId]
    );

    const pronos = await db.getAllAsync(
      'SELECT * FROM pronostics WHERE matchId = ?',
      [matchId]
    );

    setMatch(result);
    setPronostics(pronos);
  };

  const addPronostic = async () => {
    await db.runAsync(
      `INSERT INTO pronostics (
        matchId,
        pronostiqueurId,
        halftimeHome,
        halftimeAway,
        finalHome,
        finalAway
      ) VALUES (?, ?, ?, ?, ?, ?)`,
      [
        matchId,
        1,
        0,
        0,
        Number(finalHome),
        Number(finalAway),
      ]
    );

    setVisible(false);

    loadData();
  };

  if (!match) return null;

  return (
    <View style={{ flex: 1 }}>
      <Card style={{ margin: 10 }}>
        <Card.Content>
          <Text variant="titleLarge">
            {match.name}
          </Text>

          <Text>
            {match.status}
          </Text>
        </Card.Content>
      </Card>

      <FlatList
        data={pronostics}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={{ margin: 10 }}>
            <Card.Content>
              <Text>
                Score final :
                {item.finalHome} - {item.finalAway}
              </Text>
            </Card.Content>
          </Card>
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
            label="Score domicile"
            value={finalHome}
            onChangeText={setFinalHome}
          />

          <TextInput
            label="Score extérieur"
            value={finalAway}
            onChangeText={setFinalAway}
          />

          <Button
            mode="contained"
            onPress={addPronostic}
            style={{ marginTop: 16 }}
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