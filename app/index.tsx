// app/index.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { loginUser } from './auth';
import { useNavigation } from '@react-navigation/native';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleSubmit = async () => {
    const user = await loginUser(email, password);
    if (user) {
      navigation.navigate('(tabs)');
    }
  };

  return (
    <View>
      <Text>Email:</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, color: 'white'}}
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
      />
      <Text>Password:</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, color: 'white'}}
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <Button
        title="Login"
        onPress={handleSubmit}
      />
    </View>
  );
}