import 'react-native-gesture-handler';

import { useEffect, useState } from 'react';

import {
  NavigationContainer,
} from '@react-navigation/native';

import {
  ActivityIndicator,
  View,
} from 'react-native';

import { PaperProvider } from 'react-native-paper';

import RootNavigator from './src/navigation/RootNavigator';

import { initDatabase } from './src/database/schema';

import {
  getLastScreen,
} from './src/services/navigationStorage';

export default function App() {

  const [loading, setLoading] =
    useState(true);

  const [initialRoute, setInitialRoute] =
    useState<any>(undefined);

  useEffect(() => {
    initialize();
  }, []);

  const initialize = async () => {

    try {

      await initDatabase();

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