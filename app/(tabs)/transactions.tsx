// React and React hooks
import React from 'react';
// Third-party libraries
import { Image, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
// Components
import TransactionForm from '@/components/TransactionForm';
// Assets
import autoTransactionBanner from '@/assets/images/auto-transaction-banner.png';

export default function TransactionsScreen() {
  const { t } = useTranslation();

  return (
    <SafeAreaView className="bg-budget-charcoal flex-1">
      <ScrollView className='mb-16 px-8 py-4'>
        <View className='mb-8 items-center'>
          <Text className="text-white text-2xl font-bold pt-4">{t('transactions.addTransaction')}</Text>
        </View>
        <Image 
          source={autoTransactionBanner} 
          className='w-full h-40' 
          resizeMode='contain' 
        />
        <TransactionForm />
      </ScrollView>
    </SafeAreaView>
  );
}