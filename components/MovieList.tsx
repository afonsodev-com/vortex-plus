import React from 'react';
import { Card, H5, Heading, Text, XStack, Image, YStack, ScrollView } from 'tamagui';
import { Link } from 'expo-router'; // Importe o Link

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
  return (
    <YStack mt="$4" ml="$2">
      <H5 mb="$2" fontWeight={'$7'}>{title}</H5>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <XStack gap="$2">
          {movies.map((movie) => (
            <Link
              key={movie.id}
              href={{ pathname: 'movie', params: { movie } } as any} // Navega para a tela de detalhes com os parâmetros do filme
            >
              <Card
                key={movie.id}
                elevate
                size="$4"
                width={110}
                height={180}
                borderRadius={5}
                overflow='hidden'
              >
                <Image
                  source={{ uri: movie.poster }}
                  width="100%"
                  height="100%"
                  resizeMode="cover"
                />
              </Card>
            </Link>
          ))}
        </XStack>
      </ScrollView>
    </YStack>
  );
};

export default MovieList;
