import React from 'react';
import { Text, View } from 'react-native';
import { Video } from 'expo-av';
import { Link } from 'expo-router'; // Importe o Link

interface Movie {
  id: number;
  title: string;
  poster: string;
  description: string;
  videoUri: string;
}

interface MovieDetailsProps {
  route: {
    params: {
      movie: Movie;
    };
  };
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ route }) => {
  const { movie } = route.params;

  return (
    <View>
      <Text>{movie.title}</Text>
      <Text>{movie.description}</Text>
      <Video
        source={{ uri: movie.videoUri }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        shouldPlay
        isLooping
        style={{ width: '100%', height: 300 }}
      />
    </View>
  );
};

export default MovieDetails;
