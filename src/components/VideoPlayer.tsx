// VideoPlayer.tsx
import React, { useRef, useState, useEffect } from 'react';
import { Video, ResizeMode, Audio, AVPlaybackStatus } from 'expo-av';

interface VideoPlayerProps {
  videoUri: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUri }) => {
  const videoRef = useRef<Video>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const playVideo = async () => {
      if (isPlaying) {
        await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
        videoRef.current?.playAsync();
      }
    };
    playVideo();
  }, [isPlaying]);

  const handlePlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if ('isPlaying' in status) {
      setIsPlaying(status.isPlaying);
    }
  };

  return (
    <Video
      ref={videoRef}
      onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
      source={{ uri: videoUri }}
      rate={1.0}
      volume={1.0}
      isMuted={false}
      resizeMode={"cover" as ResizeMode}
      useNativeControls
      style={{ width: "100%", height: 200, borderRadius: 2 }}
    />
  );
};

export default VideoPlayer;