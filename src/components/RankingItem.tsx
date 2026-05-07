import { Card, Text } from 'react-native-paper';

export default function RankingItem({ item }: any) {
  return (
    <Card style={{ margin: 10 }}>
      <Card.Content>
        <Text variant="titleMedium">
          {item.name}
        </Text>

        <Text>
          {item.points} points
        </Text>
      </Card.Content>
    </Card>
  );
}