// app/(profile)/_layout.tsx
import { Stack } from 'expo-router';
import ProfileScreen from './index';

export default function ProfileLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}