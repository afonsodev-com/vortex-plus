// app/(tabs)/(news)/index.tsx
import { Text, Image, XStack, YStack, Card, View } from 'tamagui';
import { ScrollView } from 'react-native';
import Header from '../../../components/Header';
import { news } from '../../../data/movies';

export default function NewsScreen() {
  return (
    <ScrollView style={{marginTop: 60}}>
      <Header />
      <YStack>
        {news.map((item) => (
          <Card key={item.id} mt={10} p={5} width="100%" bg="surface" borderRadius={'$8'} overflow='hidden' gap={'$2'}>
            <Image src={item.poster} alt={item.title} width="100%" height={200} />
            <Text color="whitesmoke" fontSize={16}>Disponível em: {item.date}</Text>
            <Text color="$gray11Dark" fontSize={14}>{item.description}</Text>
          </Card>
        ))}
      </YStack>
    </ScrollView>
  );
}