import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { useTranslation } from 'react-i18next';

export default function SplashScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

  return (
    <View className="bg-budget-charcoal flex-1 justify-center items-center gap-4">
      <Spinner
        visible={isLoading}
        textContent="Loading"
      />
      <Text className="absolute top-1/3 left-1/2 -translate-x-1/2 text-center text-budget-snow text-2xl font-bold">{t('loading')}</Text>
    </View>
  );
}