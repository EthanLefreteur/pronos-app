import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import MainTabs from './MainTabs';

import CompetitionDetailsScreen
  from '../screens/competitions/CompetitionDetailsScreen';

import MatchDetailsScreen
  from '../screens/matches/MatchDetailsScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator({
  initialRoute,
}: any) {

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
        initialParams={
          initialRoute?.screen ===
          'CompetitionDetails'
            ? initialRoute.params
            : undefined
        }
      />

      <Stack.Screen
        name="MatchDetails"
        component={MatchDetailsScreen}
        initialParams={
          initialRoute?.screen ===
          'MatchDetails'
            ? initialRoute.params
            : undefined
        }
      />

    </Stack.Navigator>
  );
}