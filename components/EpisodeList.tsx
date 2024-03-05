import React, { useRef, useCallback } from "react";
import { YStack, Text, Image, XStack } from "tamagui";
import { TouchableOpacity } from "react-native";
import { Video, AVPlaybackStatus } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';

interface Episode {
  description: string;
  id: number;
  title: string;
  poster: string;
  duration: string;
  videoUrl: string;
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
  const videoRef = useRef<Video>(null);

  const handlePlayVideo = useCallback(async (videoUrl: string) => {
    if (videoRef.current) {
      try {
        await videoRef.current.loadAsync({ uri: videoUrl }, {}, false);
        await videoRef.current.playAsync();
        await videoRef.current.presentFullscreenPlayer();
      } catch (error) {
        console.error("Error loading video", error);
      }
    }
  }, [videoRef]);

  if (!episodes) {
    return null;
  }

  return (
    <YStack gap="$4">
      {episodes.map((episode) => (
        <EpisodeItem key={episode.id} episode={episode} handlePlayVideo={handlePlayVideo} />
      ))}
      <Video
        ref={videoRef}
        style={{ width: "100%", height: "100%" }}
        useNativeControls
        resizeMode="contain"
        onFullscreenUpdate={async (event) => {
          if (event.fullscreenUpdate === Video.FULLSCREEN_UPDATE_PLAYER_DID_PRESENT) {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
          } else if (event.fullscreenUpdate === Video.FULLSCREEN_UPDATE_PLAYER_DID_DISMISS) {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
          }
        }}
      />
    </YStack>
  );
};