// app/(tabs)/(home)/index.tsx
import { Text, View } from 'tamagui'
// import MovieList from '../../components/MovieList'

export default function HomeScreen() {
  return (
    <View flex={1} alignItems="center">
      <Text color={'white'} fontSize={20}>Home</Text>
      {/* <MovieList /> */}
    </View>
  )
}
