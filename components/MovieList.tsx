// components/MovieList.tsx
import React from 'react';
import { Card, H5, ScrollView, Image, XStack, YStack } from 'tamagui';
import { useNavigation } from 'expo-router';

interface Movie {
  id: number;
  title: string;
  poster: string;
  description: string;
  videoUri: string;
}

interface MovieListProps {
  title: string;
  movies: Movie[];
}

const MovieList: React.FC<MovieListProps> = ({ title, movies }) => {
  const navigation = useNavigation();

  return (
    <YStack mt="$4" ml="$2">
      <H5 mb="$2" color="white" fontWeight="$7">
        {title}
      </H5>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <XStack gap="$2">
          {movies.map((movie) => (
            <Card
              key={movie.id}
              elevate
              size="$4"
              width={110}
              height={180}
              borderRadius={5}
              overflow="hidden"
              onPress={() => navigation.navigate('(movie)', { id: movie.id })} // Passar { id: movie.id }
            >
              <Image
                source={{ uri: movie.poster }}
                width="100%"
                height="100%"
                resizeMode="cover"
              />
            </Card>
          ))}
        </XStack>
      </ScrollView>
    </YStack>
  );
};

export default MovieList;
