// register.tsx
import React, { useState } from 'react';
import { registerUser } from './auth';
import { Button, Input, View, YStack, Text, Image } from 'tamagui';
import { Alert, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import PaymentPlans from '@/components/Paymentplans';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [plan, setPlan] = useState(null);

  const handleSubmit = async () => {
    const emailRegex = /\S+@\S+\.\S+/;

    if (!email || !password || !username) {
      Alert.alert("Erro", "Por favor, preencha todos os campos!");
      return;
    }

    if (!emailRegex.test(email)) {
      Alert.alert("Erro", "Por favor, insira um email válido!");
      return;
    }

    if (!confirmPassword) {
      Alert.alert("Erro", "Por favor, confirme sua senha!");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Erro", "As senhas não correspondem!");
      return;
    }

    if (!plan) {
      Alert.alert("Erro", "Por favor, escolha um plano!");
      return;
    }

    const user = await registerUser(email, password, username, plan);
    if (user) {
      Alert.alert("Sucesso", "Registro realizado com sucesso!");
    }
  };

  return (
    <YStack flex={1} mt="$-15" justifyContent="center" padding="$3" space="$3">
      {/* <PaymentPlans onPlanSelect={setPlan} /> */}
      <YStack width={250} alignSelf="center" space="$3">
        <View style={{alignItems: 'center', marginBottom: 40}}>
          <Image
            source={{ uri: 'https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.png' }}
            style={{ width: 220, height: 60 }}
          />
        </View>
        <Input
          size="$4"
          placeholder="Username"
          onChangeText={setUsername}
          value={username}
        />
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
        <Input
          size="$4"
          placeholder="Confirm Password"
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          secureTextEntry
        />
        <Button
          title="Register"
          onPress={handleSubmit}
        >
          Register
        </Button>
        <TouchableOpacity style={{ marginTop: 20 }}>
          <Link href="/login">
            <Text theme="alt1" textAlign="center">
              Já tem uma conta? Faça login aqui
            </Text>
          </Link>
        </TouchableOpacity>
      </YStack>
    </YStack>
  );
};