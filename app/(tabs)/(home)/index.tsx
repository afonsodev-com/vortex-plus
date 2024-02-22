// app/(tabs)/(home)/index.tsx
import React from 'react';
import { View, ScrollView } from 'react-native';
import Header from '../../../components/Header';
import FeaturedMovie from '../../../components/FeaturedMovies';

const movies = [
  {
    id: 1,
    title: 'Movie 1',
    poster: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/hmHA5jqxN3ESIAGx0jAwV7TJhTQ.jpg',
    description: 'This is a description of the first movie.',
  },
  {
    id: 2,
    title: 'Movie 2',
    poster: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/eLXRCSKXAo9831a9Bw22TdZSnzL.jpg',
    description: 'This is a description of the second movie.',
  },
];

export default function HomeScreen() {
  return (
    <ScrollView style={{marginTop: 60}}>
      <Header />
      <FeaturedMovie movies={movies} />
    </ScrollView>
  );
}