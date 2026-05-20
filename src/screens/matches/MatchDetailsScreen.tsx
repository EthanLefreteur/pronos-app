import { useEffect, useState } from 'react';

import {
  View,
  FlatList,
} from 'react-native';

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

import {
  vibrateSuccess,
} from '../../services/haptics';
import { Match } from '../../types';

export default function MatchDetailsScreen({
  route,
}: any) {

  const { matchId } = route.params;

  const [match, setMatch] =
    useState<any>(null);

  const [pronostics, setPronostics] =
    useState<any[]>([]);

  const [addPronosticvisible, setAddPronosticvisible] =
    useState(false);
  
  const [confirmMatchvisible, setConfirmMatchvisible] =
    useState(false);
  

  const [halftimeHome, setHalftimeHome] =
    useState('0');

  const [halftimeAway, setHalftimeAway] =
    useState('0');

  const [finalHome, setFinalHome] =
    useState('0');

  const [finalAway, setFinalAway] =
    useState('0');

  const [status, setStatus] =
    useState('Terminé');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {

    const result =
      await db.getFirstAsync<Match>(
        'SELECT * FROM matches WHERE id = ?',
        [matchId]
      );

    const pronos =
      await db.getAllAsync(
        'SELECT * FROM pronostics WHERE matchId = ?',
        [matchId]
      );

    setMatch(result);
    setPronostics(pronos);

    if (result) {

      setHalftimeHome(
        String(result.halftimeHome || 0)
      );

      setHalftimeAway(
        String(result.halftimeAway || 0)
      );

      setFinalHome(
        String(result.finalHome || 0)
      );

      setFinalAway(
        String(result.finalAway || 0)
      );

      setStatus(
        result.status || 'À venir'
      );
    }
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

    setAddPronosticvisible(false);

    loadData();
  };

  const saveMatchResult = async () => {

    await db.runAsync(
      `UPDATE matches
       SET halftimeHome = ?,
           halftimeAway = ?,
           finalHome = ?,
           finalAway = ?,
           status = ?
       WHERE id = ?`,
      [
        Number(halftimeHome),
        Number(halftimeAway),
        Number(finalHome),
        Number(finalAway),
        status,
        matchId,
      ]
    );

    await vibrateSuccess();

    setConfirmMatchvisible(false);

    loadData();
  };

  if (!match) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>

      <Card style={{ margin: 10 }}>
        <Card.Content>

          <Text variant="titleLarge">
            {match.name}
          </Text>

          <Text>
            Statut : {match.status}
          </Text>

          <Text>
            Mi-temps : {match.halftimeHome} - {match.halftimeAway}
          </Text>

          <Text>
            Final : {match.finalHome} - {match.finalAway}
          </Text>

        </Card.Content>
      </Card>

      <FlatList
        data={pronostics}
        keyExtractor={(item) =>
          item.id.toString()
        }
        renderItem={({ item }) => (

          <Card style={{ margin: 10 }}>
            <Card.Content>

              <Text>
                Pronostic : {item.finalHome} - {item.finalAway}
              </Text>

            </Card.Content>
          </Card>

        )}
      />

      <Portal>
        <Modal
          visible={addPronosticvisible}
          onDismiss={() => setAddPronosticvisible(false)}
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

      <Portal>

        <Modal
          visible={confirmMatchvisible}
          onDismiss={() =>
            setConfirmMatchvisible(false)
          }
          contentContainerStyle={{
            backgroundColor: 'white',
            margin: 20,
            padding: 20,
            borderRadius: 12,
          }}
        >

          <Text
            variant="titleMedium"
            style={{ marginBottom: 16 }}
          >
            Résultat du match
          </Text>

          <TextInput
            label="Score mi-temps domicile"
            keyboardType="numeric"
            value={halftimeHome}
            onChangeText={setHalftimeHome}
            style={{ marginBottom: 12 }}
          />

          <TextInput
            label="Score mi-temps extérieur"
            keyboardType="numeric"
            value={halftimeAway}
            onChangeText={setHalftimeAway}
            style={{ marginBottom: 12 }}
          />

          <TextInput
            label="Score final domicile"
            keyboardType="numeric"
            value={finalHome}
            onChangeText={setFinalHome}
            style={{ marginBottom: 12 }}
          />

          <TextInput
            label="Score final extérieur"
            keyboardType="numeric"
            value={finalAway}
            onChangeText={setFinalAway}
            style={{ marginBottom: 12 }}
          />

          <TextInput
            label="Statut"
            value={status}
            onChangeText={setStatus}
            style={{ marginBottom: 20 }}
          />

          <Button
            mode="contained"
            onPress={saveMatchResult}
          >
            Valider le résultat
          </Button>

        </Modal>

      </Portal>

      <FAB
        icon="plus"
        style={{
          position: 'absolute',
          left: 16,
          bottom: 64,
        }}
        onPress={() => setAddPronosticvisible(true)}
      />

      <FAB
        icon="soccer"
        style={{
          position: 'absolute',
          right: 16,
          bottom: 64,
        }}
        onPress={() => setConfirmMatchvisible(true)}
      />

    </View>
  );
}