// components/MovieList.tsx
import React from 'react';
import { Card, H5, Heading, Text, XStack, Image, YStack, ScrollView } from 'tamagui';
import { useNavigation } from 'expo-router'; // Importe o useNavigation

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
  const navigation = useNavigation(); // Use o hook useNavigation

  return (
    <YStack mt="$4" ml="$2">
      <H5 mb="$2" color={'white'} fontWeight={'$7'}>{title}</H5>
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
              overflow='hidden'
              onPress={() => navigation.navigate('(movie)', { movieId: movie.id })} // Use o método navigate do objeto navigation
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