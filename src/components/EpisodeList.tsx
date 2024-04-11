// EpisodeList.tsx
import React, { useState, useRef, useCallback } from "react";
import { YStack, Text } from "tamagui";
import { Video, AVPlaybackStatus, ResizeMode } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
import EpisodeItem from './EpisodeItem';

export const EpisodeList: React.FC<{ episodes: Episode[] }> = ({ episodes }) => {
  const videoRef = useRef<Video>(null);

  const handlePlayVideo = useCallback(async (videoUrl: string) => {
    if (videoRef.current) {
      try {
        await videoRef.current.loadAsync({ uri: videoUrl }, {}, false);
        await videoRef.current.presentFullscreenPlayer();
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
      } catch (error) {
        // Implement error handling here
      }
    }
  }, [videoRef]);

  const handleVideoLoaded = useCallback(async () => {
    if (videoRef.current) {
      try {
        await videoRef.current.playAsync();
      } catch (error) {
        // Implement error handling here
      }
    }
  }, [videoRef]);

  if (!episodes) {
    return null;
  }

  const episodesBySeason = episodes.reduce<{ [key: number]: Episode[] }>((acc, episode) => {
    (acc[episode.season] = acc[episode.season] || []).push(episode);
    return acc;
  }, {});

  return (
    <YStack gap="$4">
      {Object.keys(episodesBySeason).map((season) => (
        <YStack key={season} gap="$4">
          <Text color="white" fontWeight="$7">{`Temporada ${season}`}</Text>
          {episodesBySeason[Number(season)].map((episode) => (
            <EpisodeItem key={episode.id} episode={episode} handlePlayVideo={handlePlayVideo} />
          ))}
        </YStack>
      ))}
    <Video
      ref={videoRef}
      style={{ width: "100%", height: "100%" }}
      useNativeControls
      resizeMode={"contain" as ResizeMode}
      onFullscreenUpdate={async (event) => {
        if (event.fullscreenUpdate === 3) {
          await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
        }
      }}
      onLoad={handleVideoLoaded}
    />
    </YStack>
  );
};