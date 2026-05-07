import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CompetitionRankingScreen from '../screens/competitions/CompetitionRankingScreen';
import MatchsListScreen from '../screens/matches/MatchsListScreen';

const Tab = createBottomTabNavigator();

export default function CompetitionTabs({ route }: any) {
  const { competitionId } = route.params;

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Classement"
        component={CompetitionRankingScreen}
        initialParams={{ competitionId }}
      />

      <Tab.Screen
        name="Matchs"
        component={MatchsListScreen}
        initialParams={{ competitionId }}
      />
    </Tab.Navigator>
  );
}