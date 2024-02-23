// app/(tabs)/(home)/index.tsx
import { SafeAreaView, ScrollView } from 'react-native';
import Header from '../../../components/Header';
import FeaturedMovie from '../../../components/FeaturedMovies';
import MovieList from '../../../components/MovieList';
import { movies } from '../../../data/movies';

export default function HomeScreen() {
  return (
    <SafeAreaView style={{flex: 1, marginTop: 60}}>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <FeaturedMovie movies={movies} />
        <MovieList title="Trending" movies={movies} />
        <MovieList title="Most Watched" movies={movies} />
        <MovieList title="Popular Series" movies={movies} />
      </ScrollView>
    </SafeAreaView>
  );
}