// app/_layout.tsx
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { SplashScreen, Stack } from "expo-router";
import { TamaguiProvider } from "tamagui";
import { getAuth, User, onAuthStateChanged } from "firebase/auth";
import { StripeProvider } from '@stripe/stripe-react-native';

import "../../tamagui-web.css";

import { config } from "../../tamagui.config";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [interLoaded, interError] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  function handleAuthStateChanged(user: User | null) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    if (interLoaded || interError) {
      SplashScreen.hideAsync();
    }

    const auth = getAuth();
    const subscriber = onAuthStateChanged(auth, handleAuthStateChanged);
    return subscriber;
  }, [interLoaded, interError]);

  if (!interLoaded && !interError) {
    return null;
  }

  if (initializing) return null;

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <TamaguiProvider config={config} defaultTheme="dark">
      <ThemeProvider value={DarkTheme}>
        <StripeProvider
          publishableKey="pk_live_51OxCqWCofT1MBGPJA74YSwcKZmVsWT9ox0wz8ABNwTSbj1dz1fQ6cxrR7mombhjr8bVELDfl9Zs9jeLUxZWqn58X00BLhdjiAl"
        >
        <Stack>
          <Stack.Screen name="register" />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(movie)/[id]" options={{ presentation: 'modal'}} />
          <Stack.Screen name="(profile)" options={{ headerTitle: "Profile" }} />
        </Stack>
      </StripeProvider>
      </ThemeProvider>
    </TamaguiProvider>
  );
}
