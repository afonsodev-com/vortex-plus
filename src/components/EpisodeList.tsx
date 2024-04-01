import React, { useState, useCallback } from "react";
import { YStack, Text, Image, XStack } from "tamagui";
import { TouchableOpacity } from "react-native";
import VideoPlayer from './VideoPlayer';

interface Episode {
  description: string;
  id: number;
  title: string;
  poster: string;
  duration: string;
  videoUrl: string;
  season: number;
}

const EpisodeItem: React.FC<{ episode: Episode, handlePlayVideo: (videoUrl: string) => void }> = ({ episode, handlePlayVideo }) => (
  <TouchableOpacity key={episode.id} onPress={() => handlePlayVideo(episode.videoUrl)}>
    <YStack gap="$2">
      <XStack gap="$2" alignItems="center">
        <Image source={{ uri: episode.poster }} width={180} height={100} borderRadius={2} />
        <YStack gap="$1">
          <Text color="white" fontWeight="$7">{episode.title}</Text>
          <Text color="$gray11Light" fontSize="$2" >{`${episode.duration}`}</Text>
        </YStack>
      </XStack>
      <Text color="$gray11Light">{episode.description}</Text>
    </YStack>
  </TouchableOpacity>
);

export const EpisodeList: React.FC<{ episodes: Episode[] }> = ({ episodes }) => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const handlePlayVideo = useCallback((videoUrl: string) => {
    setVideoUrl(videoUrl)
  }, []);

  if (!episodes) {
    return null;
  }

  const episodesBySeason = episodes.reduce((acc, episode) => {
    (acc[episode.season] = acc[episode.season] || []).push(episode);
    return acc;
  }, {});

  return (
    <YStack gap="$4">
      {Object.keys(episodesBySeason).map((season) => (
        <YStack key={season} gap="$4">
          <Text color="white" fontWeight="$7">{`Temporada ${season}`}</Text>
          {episodesBySeason[season].map((episode) => (
            <EpisodeItem key={episode.id} episode={episode} handlePlayVideo={handlePlayVideo} />
          ))}
        </YStack>
      ))}
      {videoUrl && <VideoPlayer videoUri={videoUrl} autoPlay={true}/>}
    </YStack>
  );
};