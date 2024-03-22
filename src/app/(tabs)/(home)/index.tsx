// app/(tabs)/(home)/index.tsx
import { SafeAreaView, ScrollView } from 'react-native';
import Header from '@/components/Header';
import FeaturedMovie from '@/components/FeaturedMovies';
import MovieList from '@/components/MovieList';
import { movies, series } from '@/data/data';

export default function HomeScreen() {
  return (
    <SafeAreaView style={{flex: 1, marginTop: 40}}>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <FeaturedMovie movies={movies} />
        <MovieList title="Trending" movies={movies} />
        <MovieList title="Most Watched" movies={movies} />
        <MovieList title="Popular Series" movies={series} />
        <MovieList title="Suspense Series" movies={series} />
        <MovieList title="Family Friend" movies={movies} />
        <MovieList title="Comedy and TV" movies={movies} />
        <MovieList title="Science Fiction" movies={movies} />
        <MovieList title="Cartoon" movies={movies} />
      </ScrollView>
    </SafeAreaView>
  );
}