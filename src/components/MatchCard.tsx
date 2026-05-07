import { Card, Text, IconButton } from 'react-native-paper';

export default function MatchCard({
  match,
  onDelete,
  onPress,
}: any) {
  return (
    <Card
      style={{ margin: 10 }}
      onPress={onPress}
    >
      <Card.Content>
        <Text variant="titleMedium">
          {match.homeName} - {match.awayName}
        </Text>

        <Text>
          {match.status}
        </Text>

        {match.status === 'Terminé' && (
          <Text>
            {match.finalHome} - {match.finalAway}
          </Text>
        )}
      </Card.Content>

      <Card.Actions>
        <IconButton
          icon="delete"
          onPress={onDelete}
        />
      </Card.Actions>
    </Card>
  );
}