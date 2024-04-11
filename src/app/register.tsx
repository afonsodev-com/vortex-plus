// register.tsx
import React, { useState, useEffect } from 'react';
import { registerUser } from './auth';
import { Button, Input, View, YStack, Text, Image, H2 } from 'tamagui';
import { Alert, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import PaymentPlans from '@/components/Paymentplans';

enum Step {
  Register = 1,
  ChoosePlan = 2,
}

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [plan, setPlan] = useState(null);
  const [step, setStep] = useState<Step | null>(Step.Register);

  const handleConfirm = async () => {
    if (!plan) {
      Alert.alert("Erro", "Por favor, escolha um plano!");
      return;
    }

    try {
      const user = await registerUser(email, password, username, plan);
      
      if (user) {
        Alert.alert("Sucesso", "Registro realizado com sucesso!");
      }
    } catch (error) {
      Alert.alert("Erro", error.message);
    }
  };

  useEffect(() => {
    const emailPrefix = email.split('@')[0];
    setUsername(emailPrefix);
  }, [email]);

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

    if (step === Step.Register) {
      setStep(Step.ChoosePlan);
    } else {
      handleConfirm();
    }
  };

  return (
    <YStack flex={1} justifyContent="center" space="$3">
      {step === Step.Register ? (
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
            title="Next"
            onPress={handleSubmit}
          >
            Next
          </Button>
          <TouchableOpacity style={{ marginTop: 20 }}>
            <Link href="/login">
              <Text theme="alt1" textAlign="center">
                Já tem uma conta? Faça login aqui
              </Text>
            </Link>
          </TouchableOpacity>
        </YStack>
      ) : step === Step.ChoosePlan ? (
        <View flex={1}>
          <YStack padding="$2" py="$5" space="$5">
            <Text fontSize="$7" textAlign='center'>Choose the plan that's right for you!</Text>
            <View space="$3" px="$5">
              <Text>Watch as much as you want.</Text>
              <Text>Special recommendations for you.</Text>
              <Text>Change or cancel your plan whenever you want.</Text>
            </View>
            <PaymentPlans onPlanSelect={setPlan} />
          </YStack>
          <View flex={1} justifyContent="flex-end" alignItems="center" py="$7" >
            <Button width={350} borderRadius="$1" onPress={handleConfirm}>Confirmar</Button>
          </View>
        </View>
      ) : null}
    </YStack>
  );
};