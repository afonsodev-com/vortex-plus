// app/(profile)/index.tsx
import React, { useState, useEffect } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { Text, Paragraph, Avatar, YStack, XStack, Button } from 'tamagui';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { logoutUser } from '../auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const avatars = [
  'https://i.imgur.com/QnhmfUC.png',
  'https://i.imgur.com/9nWtdiZ.png',
  'https://i.imgur.com/3ZtRl1h.png',
  'https://i.imgur.com/tsBP63Y.png',
  'https://i.imgur.com/8rVCbDp.png',
];

const ProfileScreen: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await logoutUser();
      await AsyncStorage.setItem('userLoggedIn', 'false');
      setIsLoggedIn(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const checkLogin = async () => {
      const userLoggedIn = await AsyncStorage.getItem('userLoggedIn');
      setIsLoggedIn(userLoggedIn === 'true');
    };
    checkLogin();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      navigation.navigate('index');
    }
  }, [isLoggedIn]);

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
            <Text>{user ? user.username : 'Visitante'}</Text>
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
          <TouchableOpacity onPress={handleLogout}>
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