// app/(movie)/[id].tsx
import React, {useLayoutEffect, useState} from "react";
import { Text, H5, ScrollView, View, Button, XStack, YStack, Tabs } from "tamagui";
import { SafeAreaView } from "react-native";
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import { useLocalSearchParams, useNavigation } from "expo-router";
import { movies, series } from "@/data/data";
import { useRoute } from "@react-navigation/native";
import { EpisodeList } from "@/components/EpisodeList";
import SimilarTitles from "@/components/SimilarTitles";
import VideoPlayer from "@/components/VideoPlayer";

interface Content {
  id: number;
  title: string;
  poster: string;
  description: string;
  videoUri: string;
  trailerUri: string;
}

const MovieDetails: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const id = route.params.id;
  const content = [...movies, ...series].find((content) => content.id === Number(id));
  const [tabValue, setTabValue] = useState("tab1");

  const isSeries = content?.episodes?.length > 0;

  // Abaixo o código é para você conseguir alterar o título da stack para o do filme
  useLayoutEffect(() => {
    if (content) {
      navigation.setOptions({
        title: content.title,
      });
    }
  }, [navigation, content]);
  

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <YStack gap="$2" padding="$2">
          <VideoPlayer videoUri={content.trailerUrl} />
            <YStack gap="$2"></YStack>
              <YStack>
                <H5 color="white" fontWeight="$7">{content.title}</H5>
                <Text color="$gray11Light">{content.subtitle}</Text>
              </YStack>
              <XStack gap="$3" alignItems="cemter">
                <Text>{content.year}</Text>
                <Ionicons name="heart" size={18} color="red" />
                <Text>{content.rating}</Text>
                <MaterialIcons name="hd" size={18} color="white" />
              </XStack>
              <Button backgroundColor={'white'} color={'black'} borderRadius="$1" onPress={() => {}} icon={<Ionicons name="play" size={20} color="black" />}>
                Play
              </Button>
              <Button backgroundColor={'$gray'} color={'white'} borderRadius="$1" onPress={() => {}} icon={<MaterialIcons name="downloading" size={20} color="white" />}>
                Download
              </Button>
              <Text>{content.description}</Text>
              <XStack gap="$2" alignItems="flex-start" p="$2" gap="$10" >
                <YStack gap="$1" alignItems="center">
                  <Ionicons name="add-sharp" size={24} color="white" />
                  <Text color="$gray11Light" fontSize="$2">My List</Text>
                </YStack>
                <YStack gap="$1" alignItems="center">
                  <Feather name="thumbs-up" size={24} color="white" />
                  <Text color="$gray11Light" fontSize="$2">Like</Text>
                </YStack>
                <YStack gap="$1" alignItems="center">
                  <Ionicons name="paper-plane-outline" size={24} color="white" />
                  <Text color="$gray11Light" fontSize="$2">Recomende</Text>
                </YStack>
              </XStack>
              <Tabs defaultValue={tabValue} onValueChange={setTabValue} orientation="horizontal" flexDirection="column">
                <Tabs.List>
                {isSeries && (
                  <Tabs.Tab value="tab1" backgroundColor="$colorTransparent" p="$2" disableActiveTheme>
                    <Text>Episodes</Text>
                  </Tabs.Tab>
                )}
                <Tabs.Tab value="tab2" backgroundColor="$colorTransparent" p="$2" disableActiveTheme>
                  <Text>Similar Titles</Text>
                </Tabs.Tab>
                </Tabs.List>
                {isSeries && (
                  <Tabs.Content value="tab1" p="$2">
                    <EpisodeList episodes={content.episodes} />
                  </Tabs.Content>
                )}
                <Tabs.Content value="tab2" p="$2">
                  <SimilarTitles />
                </Tabs.Content>
              </Tabs>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MovieDetails;