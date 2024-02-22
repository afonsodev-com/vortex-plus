// app/index.tsx
import React, { useState } from 'react';
import { loginUser } from './auth';
import { useNavigation } from '@react-navigation/native';
import { Button, Input, YStack } from 'tamagui';
import { Image, View, Alert } from 'react-native';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleSubmit = async () => {
    const user = await loginUser(email, password);
    if (user) {
      Alert.alert("Sucesso", "Login realizado com sucesso!");
      navigation.navigate('(tabs)');
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <YStack flex={1} justifyContent="center" padding="$3" space="$3">
      <YStack width={250} alignSelf="center" space="$3">
        <View style={{alignItems: 'center', marginBottom: 50}}>
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
      </YStack>
    </YStack>
  );
}