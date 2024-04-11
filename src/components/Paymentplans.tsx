import React, { FC, useState } from 'react';
import { Button, Card, H2, Text, Paragraph, XStack, View, Square, RadioGroup, YStack, Label } from 'tamagui';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { Alert } from 'react-native';

interface PaymentPlansProps {
  onPlanSelect: (plan: Plan) => void;
}

const PaymentPlans: FC<PaymentPlansProps> = ({ onPlanSelect }) => {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  const plans = [
    {
      id: '1',
      name: 'Basic Plan',
      catalogAccess: 'Full catalog access',
      videoQuality: 'Resolution adaptable SD/HD',
      profile: 'Have up to 4 profiles',
      devices: 'Watch on 2 devices at the same time',
      price: '$ 9.90 / Month'
    },
    {
      id: '2',
      name: 'Plus Plan',
      catalogAccess: 'Full catalog access',
      videoQuality: 'Resolution HD/4K',
      profile: 'Have up to 4 profiles',
      devices: 'Watch on 4 devices at the same time',
      price: '$ 14.90 / Month'
    }
  ];

  const handleSelectPlan = (value: string) => {
    const plan = plans.find(plan => plan.id === value);
    if (plan) {
      setSelectedPlan(plan);
      onPlanSelect(plan);
    }
  };

  return (
    <View px="$4" space="$2">
      <RadioGroup aria-labelledby="Select one plan" defaultValue={selectedPlan?.id} name="plan" onValueChange={handleSelectPlan}>
        <YStack space="$2">
          {plans.map((plan, index) => (
            <XStack key={index} alignItems='center' space="$2">
              <RadioGroup.Item value={plan.id} id={`radiogroup-${plan.id}`} size="$3">
                <RadioGroup.Indicator />
              </RadioGroup.Item>
              <Label htmlFor={`radiogroup-${plan.id}`} size="$1">{plan.name}</Label>
            </XStack>
          ))}
        </YStack>
      </RadioGroup>
      {selectedPlan && (
        <Card>
          <XStack space>
            <MaterialIcons name="check" size={24} color="gray" />
            <Paragraph>{selectedPlan.videoQuality}</Paragraph>
          </XStack>
          <XStack space>
            <MaterialIcons name="check" size={24} color="gray" />
            <Paragraph>{selectedPlan.catalogAccess}</Paragraph>
          </XStack>
          <XStack space>
            <MaterialIcons name="check" size={24} color="gray" />
            <Paragraph>{selectedPlan.profile}</Paragraph>
          </XStack>
          <XStack space>
            <MaterialIcons name="check" size={24} color="gray" />
            <Paragraph>{selectedPlan.devices}</Paragraph>
          </XStack>
          <XStack space>
            <MaterialIcons name="check" size={24} color="gray" />
            <Paragraph>{selectedPlan.price}</Paragraph>
          </XStack>
        </Card>
      )}
    </View>
  );
};

export default PaymentPlans;