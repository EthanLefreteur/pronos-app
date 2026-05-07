import { Card, Text } from 'react-native-paper';

export default function PronosticCard({ pronostic }: any) {
  return (
    <Card style={{ margin: 10 }}>
      <Card.Content>
        <Text>
          Mi-temps :
          {pronostic.halftimeHome} -
          {pronostic.halftimeAway}
        </Text>

        <Text>
          Final :
          {pronostic.finalHome} -
          {pronostic.finalAway}
        </Text>
      </Card.Content>
    </Card>
  );
}