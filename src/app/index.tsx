// app/index.tsx
import React, { useState, useEffect } from 'react';
import { loginUser } from './auth';
import { useNavigation } from 'expo-router';
import { Button, Input, YStack, Text } from 'tamagui';
import { Image, View, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link } from 'expo-router';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleSubmit = async () => {
    const emailRegex = /\S+@\S+\.\S+/;

    if (!email || !password) {
      Alert.alert("Erro", "Por favor, preencha todos os campos!");
      return;
    }

    if (!emailRegex.test(email)) {
      Alert.alert("Erro", "Por favor, insira um email válido!");
      return;
    }

    const user = await loginUser(email, password);
    if (user) {
      Alert.alert("Sucesso", "Login realizado com sucesso!");
      navigation.navigate('(tabs)');
      await AsyncStorage.setItem('userLoggedIn', 'true');
    }
  };

  useEffect(() => {
    const checkLogin = async () => {
      const userLoggedIn = await AsyncStorage.getItem('userLoggedIn');
      if (userLoggedIn === 'true') {
        navigation.navigate('(tabs)');
      }
    };
    checkLogin();
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <YStack flex={1} mt="$-15" justifyContent="center" padding="$3" space="$3">
      <YStack width={250} alignSelf="center" space="$3">
        <View style={{alignItems: 'center', marginBottom: 40}}>
          <Image
            source={{ uri: 'https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.png' }}
            style={{ width: 220, height: 60 }}
          />
        </View>
        <Input
          size="$4"
          placeholder="Email"
          onChangeText={setEmail}
          value={email}
          keyboardType="email-address"
        />
        <Input
          size="$4"
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
        />
        <Button
          title="Login"
          onPress={handleSubmit}
        >
          Login
        </Button>
        <TouchableOpacity style={{ marginTop: 20, backgroundColor: 'blue', padding: 10, alignItems: 'center', justifyContent: 'center' }}>
          <Link href="/register">
            <Text theme="alt1" textAlign="center">
              Não tem uma conta? Crie aqui
            </Text>
          </Link>
        </TouchableOpacity>
      </YStack>
    </YStack>
  );
};