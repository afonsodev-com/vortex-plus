// app/(movie)/index.tsx
import React, {useLayoutEffect} from "react";
import { Text, View } from "tamagui";
import { Video, ResizeMode } from "expo-av";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { movies } from "../../data/movies";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";

interface movie {
  id: number;
  title: string;
  poster: string;
  description: string;
  videoUri: string;
}

const MovieDetails: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const id = route.params.id;
  const movie = movies.find((movie) => movie.id === Number(id));

  // Abaixo o código é para você conseguir alterar o título da stack para o do filme
  useLayoutEffect(() => {
    if (movie) {
      navigation.setOptions({
        title: movie.title,
      });
    }
  }, [navigation, movie]);

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
        style={{ width: "100%", height: 300 }}
      />
    </View>
  );
};

export default MovieDetails;
