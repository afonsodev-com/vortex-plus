// featuredMovies.tsx
import React, { useState, useEffect } from 'react';
import { Card, H2, Text, Paragraph, Button, XStack, Image, YStack } from 'tamagui';
import { Ionicons } from '@expo/vector-icons';

interface Movie {
  id: number;
  title: string;
  poster: string;
  description: string;
}

interface FeaturedMoviesProps {
  movies: Movie[];
}

const FeaturedMovies: React.FC<FeaturedMoviesProps> = ({ movies }) => {
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMovieIndex((currentMovieIndex + 1) % movies.length);
    }, 9000);

    return () => clearInterval(interval);
  }, [currentMovieIndex, movies.length]);

  const movie = movies[currentMovieIndex];

  return (
    <YStack mt="$4">
      <Card elevate size="$4" width="100%" height={350}>
        <Image
          source={{ uri: movie.poster }}
          width="100%"
          height="100%"
          position="absolute"
        />
        <YStack
          flex={1}
          backgroundColor="rgba(0,0,0,0.4)"
          justifyContent="flex-end"
          p="$3"
        >
          {/* <H2>{movie.title}</H2>
          <Paragraph>{movie.description}</Paragraph> */}
          <XStack gap="$11" justifyContent="center">
            <YStack alignItems="center">
              <Text borderRadius="$10" onPress={() => {}}>
                <Ionicons name="add" size={24} color="white" />
              </Text>
              <Text color="white">My List</Text>
            </YStack>
            <XStack alignItems="center">
              <Button backgroundColor={'white'} color={'black'} borderRadius="$1" onPress={() => {}} icon={<Ionicons name="play" size={20} color="black" />}>
                Play
              </Button>
            </XStack>
            <YStack alignItems="center">
              <Text borderRadius="$10" onPress={() => {}}>
                <Ionicons name="information-circle" size={24} color="white" />
              </Text>
              <Text color="white">Info</Text>
            </YStack>
          </XStack>
        </YStack>
      </Card>
    </YStack>
  );
};

export default FeaturedMovies;