import { saveLastScreen, getLastScreen } from '../../services/navigationStorage';
import { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
} from 'react-native';

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

export default function CompetitionsScreen({ navigation }: any) {
  const [competitions, setCompetitions] = useState<any[]>([]);
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState('');

  const loadCompetitions = async () => {
    const result = await db.getAllAsync(
      'SELECT * FROM competitions WHERE finished = 0'
    );

    setCompetitions(result);
  };

  useEffect(() => {
    loadCompetitions();
    restoreNavigation();
  }, []);

  const restoreNavigation = async () => {
    const lastScreen = await getLastScreen();

    if (!lastScreen) return;

    navigation.navigate(
      lastScreen.screen,
      lastScreen.params
    );
  };

  const addCompetition = async () => {
    await db.runAsync(
      `INSERT INTO competitions (name) VALUES (?)`,
      [name]
    );

    setName('');
    setVisible(false);

    loadCompetitions();
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={competitions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card
            style={styles.card}
            onPress={() => {
              saveLastScreen(
                'CompetitionDetails',
                {
                  competitionId: item.id,
                }
              );

              navigation.navigate('CompetitionDetails', {
                competitionId: item.id,
              });
            }
            }
          >
            <Card.Content>
              <Text variant="titleLarge">
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
          contentContainerStyle={styles.modal}
        >
          <TextInput
            label="Nom"
            value={name}
            onChangeText={setName}
          />

          <Button
            mode="contained"
            onPress={addCompetition}
            style={{ marginTop: 16 }}
          >
            Ajouter
          </Button>
        </Modal>
      </Portal>

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => setVisible(true)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  card: {
    margin: 12,
  },

  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
  },

  modal: {
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 12,
  },
});