import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainTabs from './MainTabs';
import CompetitionDetailsScreen from '../screens/competitions/CompetitionDetailsScreen';
import MatchDetailsScreen from '../screens/matches/MatchDetailsScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={MainTabs}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="CompetitionDetails"
        component={CompetitionDetailsScreen}
        options={{ title: 'Compétition' }}
      />

      <Stack.Screen
        name="MatchDetails"
        component={MatchDetailsScreen}
        options={{ title: 'Match' }}
      />
    </Stack.Navigator>
  );
}