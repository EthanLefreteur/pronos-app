import { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import {
  FAB,
  Portal,
  Modal,
  TextInput,
  Button,
  Card,
  Text,
} from 'react-native-paper';

import { db } from '../../database/db';

export default function TeamsScreen() {
  const [teams, setTeams] = useState<any[]>([]);
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    loadTeams();
  }, []);

  const loadTeams = async () => {
    const result = await db.getAllAsync(
      'SELECT * FROM teams'
    );

    setTeams(result);
  };

  const addTeam = async () => {
    await db.runAsync(
      'INSERT INTO teams (name) VALUES (?)',
      [name]
    );

    setVisible(false);
    setName('');

    loadTeams();
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={teams}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={{ margin: 10 }}>
            <Card.Content>
              <Text variant="titleMedium">
                {item.name}
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
            label="Nom"
            value={name}
            onChangeText={setName}
          />

          <Button
            mode="contained"
            style={{ marginTop: 16 }}
            onPress={addTeam}
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