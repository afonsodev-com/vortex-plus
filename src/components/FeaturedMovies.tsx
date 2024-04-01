// featuredMovies.tsx
import React, { useState, useEffect } from 'react';
import { Card, H2, Text, Paragraph, Button, XStack, Image, YStack } from 'tamagui';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from "expo-router";

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
    <YStack mt="$1" p="$2" borderRadius={5} alignItems='center'>
      <Link href={`(movie)/${movie.id}`} key={movie.id}>
        <Card elevate size="$4" width={340} height={400} borderRadius={10} borderColor={'gray'} borderWidth={0.5} overflow='hidden'>
          <Image
            source={{ uri: movie.poster }}
            width="100%"
            height="100%"
            position="absolute"
            resizeMode="cover"
          />
            <LinearGradient
              colors={['rgba(0,0,0,0.2)', 'transparent']}
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
            <Text mb="$3" textAlign='center'>{movie.categories.join(' • ')}</Text>
            <XStack gap="$3" justifyContent="center">
              <XStack alignItems="center">
                <Button backgroundColor={'white'} color={'black'} borderRadius="$1" size="$3.5" width="$12" onPress={() => {}} icon={<Ionicons name="play" size={20} color="black" />}>
                  Play
                </Button>
              </XStack>
              <XStack alignItems="center">
                <Button backgroundColor={'$gray'} color={'white'} borderRadius="$1" size="$3.5" width="$12" onPress={() => {}} icon={<Ionicons name="add-sharp" size={20} color="white" />}>
                  My List
                </Button>
              </XStack>
            </XStack>
          </YStack>
        </Card>
      </Link>
    </YStack>
  );
};

export default FeaturedMovies;