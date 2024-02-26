// app/(movie)/_layout.tsx
import React from 'react';
import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { TamaguiProvider } from 'tamagui';

import '../../tamagui-web.css';
import { config } from '../../tamagui.config';

export default function MovieLayout() {
  return (
    <TamaguiProvider config={config} defaultTheme="dark">
      <ThemeProvider value={DarkTheme}>
        <Stack initialRouteName="index">
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </TamaguiProvider>
  );
}