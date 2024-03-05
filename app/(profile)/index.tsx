// app/(profile)/index.tsx
import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { Text, Paragraph, Avatar, YStack, XStack, Button } from 'tamagui';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';

const avatars = [
  'https://i.imgur.com/QnhmfUC.png',
  'https://i.imgur.com/9nWtdiZ.png',
  'https://i.imgur.com/3ZtRl1h.png',
  'https://i.imgur.com/tsBP63Y.png',
  'https://i.imgur.com/8rVCbDp.png',
];

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation();
  return (
    <YStack>
      <FlatList
        data={avatars}
        horizontal
        renderItem={({ item }) => (
          <TouchableOpacity>
            <Avatar borderRadius={2} size="$5" mr="$4" mt="$4">
              <Avatar.Image src={item} />
              <Avatar.Fallback bc="red" />
            </Avatar>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      />
      <TouchableOpacity>
        <XStack alignItems="center" justifyContent="center" my="$7">
          <Feather name="edit-2" size={24} color="white" />
          <Text ml="$2">Gerenciar perfil</Text>
        </XStack>
      </TouchableOpacity>
      <Button size="$5" bg="$gray1" br="$3" p="$2" my="$1" justifyContent="flex-start" pl="$4" onPress={() => navigation.navigate('list')}>
        <Ionicons name="checkmark" size={24} color="white" />
        <Text>My List</Text>
      </Button>
      <Button size="$5" bg="$gray1" br="$3" p="$2" my="$1" justifyContent="flex-start" pl="$4" onPress={() => navigation.navigate('settings')}>
        <Ionicons name="settings-outline" size={24} color="white" />
        <Text>App Settings</Text>
      </Button>
      <Button size="$5" bg="$gray1" br="$3" p="$2" my="$1" justifyContent="flex-start" pl="$4" onPress={() => navigation.navigate('plans')}>
        <Ionicons name="checkbox-outline" size={24} color="white" />
        <Text>Plan</Text>
      </Button>
      <Button size="$5" bg="$gray1" br="$3" p="$2" my="$1" justifyContent="flex-start" pl="$4" onPress={() => navigation.navigate('account')}>
        <Ionicons name="person-circle-outline" size={24} color="white" />
        <Text>Account</Text>
      </Button>
      <Button size="$5" bg="$gray1" br="$3" p="$2" my="$1" justifyContent="flex-start" pl="$4" onPress={() => navigation.navigate('help')}>
        <Ionicons name="help-circle-outline" size={24} color="white" />
        <Text>Help</Text>
      </Button>
        <YStack alignItems="center" justifyContent="center" my="$7">
          <TouchableOpacity>
            <XStack alignItems="center">
              <Ionicons name="log-out-outline" size={24} color="white" />
              <Text ml="$2">Sign Out</Text>
            </XStack>
          </TouchableOpacity>
          <Paragraph color={'$gray11Light'} >Version: 1.0.0 (2024)</Paragraph>
        </YStack>
    </YStack>
  );
};

export default ProfileScreen;