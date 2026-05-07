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

export default function PronostiqueursScreen() {
  const [list, setList] = useState<any[]>([]);
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState('');
  
  useEffect(() => {
    loadPronostiqueurs();
  }, []);

  const loadPronostiqueurs = async () => {
    const result = await db.getAllAsync(
      'SELECT * FROM pronostiqueurs'
    );

    setList(result);
  };

  const addPronostiqueur = async () => {
    await db.runAsync(
      'INSERT INTO pronostiqueurs (name) VALUES (?)',
      [name]
    );

    setVisible(false);
    setName('');

    loadPronostiqueurs();
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={list}
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
            onPress={addPronostiqueur}
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