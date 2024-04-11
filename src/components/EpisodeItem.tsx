// EpisodeItem.tsx
import React from 'react';
import { YStack, Text, Image, XStack } from "tamagui";
import { TouchableOpacity } from "react-native";

interface EpisodeItemProps {
  episode: Episode;
  handlePlayVideo: (videoUrl: string) => void;
}

const EpisodeItem: React.FC<EpisodeItemProps> = React.memo(({ episode, handlePlayVideo }) => (
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
));

export default EpisodeItem;