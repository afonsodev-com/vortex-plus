import React, { FC, useState } from 'react';
import { Button, Card, H2, Text, Paragraph, XStack, View, Accordion, Square } from 'tamagui';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { Alert } from 'react-native';

interface PaymentPlansProps {
  onPlanSelect: (plan: Plan) => void;
}

const PaymentPlans: FC<PaymentPlansProps> = ({ onPlanSelect }) => {
  const [selectedPlanName, setSelectedPlanName] = useState<string | null>(null);

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

  const handleSelectPlan = (plan: Plan) => {
    setSelectedPlanName(plan.id);
    onPlanSelect(plan);
  };

  const verifyPlan = (id: string) => {
    return selectedPlanName === id;
  }

  return (
    <Accordion overflow="hidden" type="single" px="$4" space="$2">
      {plans.map((plan, index) => (
        <Accordion.Item key={index} value={plan.id} borderColor={verifyPlan(plan.id) ? "#22C55E" : 'transparent'} borderWidth={verifyPlan(plan.id) ? 2 : 0}>
          <Accordion.Trigger flexDirection="row" justifyContent="space-between" onPress={() => handleSelectPlan(plan)}>
            {({ open }) => (
              <>
              <XStack alignItems='center' space="$2">
                <Text fontWeight="$1">{plan.name}</Text>
                <MaterialIcons name={verifyPlan(plan.id) ? "check-circle" : "radio-button-unchecked"} size={24} color="#22C55E" />
              </XStack>
                <Square animation="quick" rotate={open ? '180deg' : '0deg'}>
                  <MaterialIcons name="expand-less" size={24} color="gray" />
                </Square>
              </>
            )}
          </Accordion.Trigger>
          <Accordion.Content>
            <XStack space>
              <MaterialIcons name="check" size={24} color="gray" />
              <Paragraph>{plan.videoQuality}</Paragraph>
            </XStack>
            <XStack space>
              <MaterialIcons name="check" size={24} color="gray" />
              <Paragraph>{plan.catalogAccess}</Paragraph>
            </XStack>
            <XStack space>
              <MaterialIcons name="check" size={24} color="gray" />
              <Paragraph>{plan.profile}</Paragraph>
            </XStack>
            <XStack space>
              <MaterialIcons name="check" size={24} color="gray" />
              <Paragraph>{plan.devices}</Paragraph>
            </XStack>
            <XStack space>
              <MaterialIcons name="check" size={24} color="gray" />
              <Paragraph>{plan.price}</Paragraph>
            </XStack>
          </Accordion.Content>
        </Accordion.Item>
        ))}
    </Accordion>
  );
};

export default PaymentPlans;