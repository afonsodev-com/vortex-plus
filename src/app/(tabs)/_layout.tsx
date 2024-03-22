// app/(tabs)/_layout.tsx
import { Ionicons } from '@expo/vector-icons';
import { Link, Tabs } from 'expo-router'
import { Pressable } from 'react-native'

type IconName = "home-outline" | "play-outline" | "cloud-download-outline";

const tabs = [
  { name: "(home)/index", title: "Home", iconName: "home-outline" as IconName },
  { name: "(news)/index", title: "Hot & News", iconName: "play-outline" as IconName },
  { name: "(download)/index", title: "Downloads", iconName: "cloud-download-outline" as IconName },
];

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'white',
      }}
    >
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            headerShown: false,
            title: tab.title,
            tabBarIcon: ({ color }) => (
              <Ionicons name={tab.iconName} size={24} color={color} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}