// app/(tabs)/(home)/index.tsx
import { SafeAreaView, ScrollView } from 'react-native';
import Header from '../../../components/Header';
import FeaturedMovie from '../../../components/FeaturedMovies';
import MovieList from '../../../components/MovieList';
import { movies } from '../../../data/movies';

function filterMoviesByCategory(movies, category) {
  return movies.filter(movie => movie.categories.includes(category));
}

export default function HomeScreen() {
  return (
    <SafeAreaView style={{flex: 1, marginTop: 40}}>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <FeaturedMovie movies={movies} />
        <MovieList title="Trending" movies={filterMoviesByCategory(movies, 'Action')} />
        <MovieList title="Most Watched" movies={filterMoviesByCategory(movies, 'Adventure')} />
        <MovieList title="Popular Series" movies={filterMoviesByCategory(movies, 'Fantasy')} />
        <MovieList title="Suspense Series" movies={filterMoviesByCategory(movies, 'Warrior')} />
        <MovieList title="Family Friend" movies={filterMoviesByCategory(movies, 'Family')} />
        <MovieList title="Comedy and TV" movies={filterMoviesByCategory(movies, 'Comedy')} />
        <MovieList title="Science Fiction" movies={filterMoviesByCategory(movies, 'Sci-Fi')} />
      </ScrollView>
    </SafeAreaView>
  );
}