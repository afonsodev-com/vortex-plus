// featuredMovies.tsx
import React, { useState, useEffect } from 'react';
import { Card, H2, Text, Paragraph, Button, XStack, Image, YStack } from 'tamagui';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface Movie {
  id: number;
  title: string;
  poster: string;
  description: string;
  categories: string[];
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
    <YStack mt="$2" p="$2" borderRadius={5}>
      <Card elevate size="$4" width="100%" height={410} borderRadius={5} borderColor={'gray'} borderWidth='0.2' overflow='hidden'>
        <Image
          source={{ uri: movie.poster }}
          width="100%"
          height="100%"
          position="absolute"
          resizeMode="cover"
        />
          <LinearGradient
            colors={['rgba(0,0,0,0.5)', 'transparent']}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              height: '50%',
            }}
          />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.9)']}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: '50%',
          }}
        />
        <YStack
          flex={1}
          justifyContent="flex-end"
          p="$3"
        >
          <Text mb="$2" textAlign='center'>{movie.categories.join(' • ')}</Text>
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