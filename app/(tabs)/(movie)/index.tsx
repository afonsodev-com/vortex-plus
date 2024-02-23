// app/(tabs)/(movie)/index.tsx
import React from 'react';
import { Text, View } from 'react-native';

interface Movie {
  id: number;
  title: string;
  poster: string;
  description: string;
}

interface MovieDetailsProps {
  movie: Movie;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ movie }) => {
  return (
    <View>
      <Text>{movie.title}</Text>
      <Text>{movie.description}</Text>
      {/* Adicione aqui o player de vídeo para reproduzir o filme */}
    </View>
  );
};

export default MovieDetails;
