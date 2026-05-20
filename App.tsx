import 'react-native-gesture-handler';

import { useEffect, useState } from 'react';

import {
  NavigationContainer,
} from '@react-navigation/native';

import {
  ActivityIndicator,
  View,
  Text,
} from 'react-native';

import { PaperProvider } from 'react-native-paper';

import RootNavigator from './src/navigation/RootNavigator';

import { initDatabase } from './src/database/schema';

import {
  getLastScreen,
} from './src/services/navigationStorage';

import {
  authenticateUser,
} from './src/services/biometric';

export default function App() {

  const [loading, setLoading] =
    useState(true);

  const [authorized, setAuthorized] =
    useState(false);

  const [initialRoute, setInitialRoute] =
    useState<any>(undefined);

  useEffect(() => {
    initialize();
  }, []);

  const initialize = async () => {

    try {

      await initDatabase();

      const success =
        await authenticateUser();

      if (!success) {
        setAuthorized(false);
        return;
      }

      setAuthorized(true);

      const lastScreen =
        await getLastScreen();

      setInitialRoute(lastScreen);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  if (loading) {

    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!authorized) {

    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 24,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            textAlign: 'center',
          }}
        >
          Authentification refusée
        </Text>
      </View>
    );
  }

  return (
    <PaperProvider>
      <NavigationContainer>
        <RootNavigator
          initialRoute={initialRoute}
        />
      </NavigationContainer>
    </PaperProvider>
  );
}