import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { useEffect } from 'react';

import RootNavigator from './src/navigation/RootNavigator';
import { initDatabase } from './src/database/schema';

export default function App() {

  useEffect(() => {
    initDatabase();
  }, []);

  return (
    <PaperProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}