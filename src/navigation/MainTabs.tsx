import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CompetitionsScreen from '../screens/competitions/CompetitionsScreen';
import PronostiqueursScreen from '../screens/pronostiqueurs/PronostiqueursScreen';
import TeamsScreen from '../screens/teams/TeamsScreen';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Competitions"
        component={CompetitionsScreen}
      />

      <Tab.Screen
        name="Pronostiqueurs"
        component={PronostiqueursScreen}
      />

      <Tab.Screen
        name="Equipes"
        component={TeamsScreen}
      />
    </Tab.Navigator>
  );
}