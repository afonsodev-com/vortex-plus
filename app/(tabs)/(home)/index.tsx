// app/(tabs)/(home)/index.tsx
import React from 'react';
import { ScrollView } from 'react-native';
import Header from '../../../components/Header';
import FeaturedMovie from '../../../components/FeaturedMovies';
import MovieList from '../../../components/MovieList';
import { movies } from '../../../data/movies';

export default function HomeScreen() {
  return (
    <ScrollView style={{marginTop: 60}}>
      <Header />
      <FeaturedMovie movies={movies} />
      <MovieList title="Trending" movies={movies} />
      <MovieList title="Most Watched" movies={movies} />
      <MovieList title="Popular Series" movies={movies} />
    </ScrollView>
  );
}
