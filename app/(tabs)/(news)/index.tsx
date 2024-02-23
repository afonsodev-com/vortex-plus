// app/(tabs)/(news)/index.tsx
import { Text, Image, XStack, YStack, Card, View } from 'tamagui';
import { ScrollView, SafeAreaView } from 'react-native';
import Header from '../../../components/Header';
import { news } from '../../../data/news';

export default function NewsScreen() {
  return (
    <SafeAreaView style={{flex:1 ,marginTop: 60}}>
        <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <YStack mt="$2" p="$2" borderRadius={5}>
          {news.map((item) => (
            <Card key={item.id} backgroundColor={'black'} width="100%" borderRadius={5} borderColor={'gray'} borderWidth={0.2} overflow='hidden' gap={'$2'}>
              <Image src={item.poster} alt={item.title} width="100%" height={200} />
              <Text color="whitesmoke" fontSize={16}>Disponível em: {item.date}</Text>
              <YStack gap={'$2'} mb="$2">
                <Image src={item.producer} alt={item.title} width={40} height={10} />
                <Text color="$gray11Dark" fontSize={14}>{item.description}</Text>
              </YStack>
            </Card>
          ))}
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
}