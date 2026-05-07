import { Card, Text } from 'react-native-paper';

export default function CompetitionCard({
  competition,
  onPress,
}: any) {
  return (
    <Card
      style={{ margin: 10 }}
      onPress={onPress}
    >
      <Card.Content>
        <Text variant="titleLarge">
          {competition.name}
        </Text>
      </Card.Content>
    </Card>
  );
}