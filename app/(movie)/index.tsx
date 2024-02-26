// app/(movie)/index.tsx
import React from 'react';
import { Text, View } from 'tamagui';
import { Video, ResizeMode } from 'expo-av';
import { useRouter } from 'expo-router';
import { movies } from '../../data/movies';
interface Movie {
  id: number;
  title: string;
  poster: string;
  description: string;
  videoUri: string;
}

const MovieDetails: React.FC = () => {
  const route = useRouter();
  const movieId = route.query?.id;

  if (!movieId) {
    return <Text>ID do filme inválido</Text>;
  }

  const id = parseInt(movieId, 10);

  const movie = movies.find(movie => movie.id === id);

  if (!movie) {
    return <Text>Filme não encontrado</Text>;
  }

  return (
    <View>
      <Text>{movie.title}</Text>
      <Text>{movie.description}</Text>
      <Video
        source={{ uri: movie.videoUrl }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode={"cover" as ResizeMode}
        shouldPlay
        isLooping
        style={{ width: '100%', height: 300 }}
      />
    </View>
  );
};

export default MovieDetails;