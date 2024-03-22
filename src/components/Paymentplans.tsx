// components/PaymentPlans.tsx
import React, { useState } from 'react';
import { Button, YStack, ScrollView, View, Text } from 'tamagui';
import { Dimensions } from 'react-native';

const PaymentPlans = ({ onPlanSelect }) => {
  const plans = [
    {
      name: 'Basic Plan',
      catalogAccess: 'Complete',
      videoQuality: 'Adaptable SD/HD',
      downloads: 'N/A',
      profiles: 2,
      devices: 2,
      price: 'R$ 9.90/month'
    },
    {
      name: 'Plus Plan',
      catalogAccess: 'Complete',
      videoQuality: 'HD/4K',
      downloads: '10GB',
      profiles: 4,
      devices: 4,
      price: 'R$ 14.90/month'
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const { width: viewportWidth } = Dimensions.get('window');

  const handleScroll = (event) => {
    const newIndex = Math.round(event.nativeEvent.contentOffset.x / viewportWidth);
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  return (
    <YStack flex={1} mt="$-15" justifyContent="center" padding="$3" space="$3">
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        pagingEnabled
      >
        {plans.map((plan, index) => (
          <YStack key={index} width={viewportWidth} alignSelf="center" space="$3">
            <Text>{plan.name}</Text>
            <Text>Catalog Access: {plan.catalogAccess}</Text>
            <Text>Video Quality: {plan.videoQuality}</Text>
            <Text>Downloads: {plan.downloads}</Text>
            <Text>Profiles: {plan.profiles}</Text>
            <Text>Devices: {plan.devices}</Text>
            <Text>Price: {plan.price}</Text>
            <Button title="Select Plan" onPress={() => onPlanSelect(plan)} />
          </YStack>
        ))}
      </ScrollView>
      <View flexDirection="row" justifyContent="center" mt="$2">
        {plans.map((_, i) => (
          <View
            key={i}
            width={10}
            height={10}
            borderRadius="50%"
            margin="0 5px"
            backgroundColor={i === activeIndex ? 'blue' : 'gray'}
          />
        ))}
      </View>
    </YStack>
  );
};

export default PaymentPlans;