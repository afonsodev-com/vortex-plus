import React, { useState } from 'react';
import { Button, Card, H2, Text, Paragraph, XStack, View, ScrollView, Checkbox } from 'tamagui';
import { MaterialIcons } from '@expo/vector-icons';

const PaymentPlans = ({ onPlanSelect }) => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const plans = [
    {
      name: 'Basic Plan',
      catalogAccess: 'Full catalog access',
      videoQuality: 'Resolution adaptable SD/HD',
      profile: 'Have up to 4 profiles',
      devices: 'Watch on 2 devices at the same time',
      price: '$9.90 / Month'
    },
    {
      name: 'Plus Plan',
      catalogAccess: 'Full catalog access',
      videoQuality: 'Resolution Full HD',
      profile: 'Have up to 4 profiles',
      devices: 'Watch on 4 devices at the same time',
      price: '$ 14.90 / Month'
    }
  ];

  const handleCheckboxChange = (plan) => {
    setSelectedPlan(plan);
    onPlanSelect(plan);
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <XStack paddingHorizontal="$2" space="$5">
        {plans.map((plan, index) => (
          <Card key={index} elevate size="$4" bordered width={360} height={300}>
            <Card.Header padded>
              <H2 fontWeight="$1" textAlign='center'>{plan.name}</H2>
            </Card.Header>
            <Card.Header padded space="$3">
              <XStack space>
                <MaterialIcons name="check" size={24} color="red" />
                <Paragraph>{plan.videoQuality}</Paragraph>
              </XStack>
              <XStack space>
                <MaterialIcons name="check" size={24} color="red" />
                <Paragraph>{plan.catalogAccess}</Paragraph>
              </XStack>
              <XStack space>
                <MaterialIcons name="check" size={24} color="red" />
                <Paragraph>{plan.profile}</Paragraph>
              </XStack>
              <XStack space>
                <MaterialIcons name="check" size={24} color="red" />
                <Paragraph>{plan.devices}</Paragraph>
              </XStack>
              <XStack space>
                <MaterialIcons name="check" size={24} color="red" />
                <Paragraph>{plan.price}</Paragraph>
              </XStack>
            </Card.Header>
          </Card>
        ))}
      </XStack>
    </ScrollView>
  );
};

export default PaymentPlans;