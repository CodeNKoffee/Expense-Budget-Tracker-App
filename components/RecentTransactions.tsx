import React from 'react';
import { Text, ScrollView, View, I18nManager } from "react-native";
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useTranslation } from 'react-i18next';

export default function RecentTransactions() {
  const transactions = useSelector((state: RootState) => state.transactions.transactions);
  const { t } = useTranslation();

  return (
    <View className='rounded-3xl bg-budget-snow px-6 py-4 flex flex-col' style={{ height: 250 }}>
      <Text
        className={`text-lg font-bold text-budget-silver pb-2 ${I18nManager.isRTL ? 'items-start' : 'items-end'}`}
      >
        {t('home.recentTransactions')}
      </Text>
      <ScrollView>
        {transactions.slice(0, 10).map((transaction) => (
          <View key={transaction.id} className='border-b-[0.5px] border-budget-silver w-full py-4 flex flex-row justify-between items-center'>
            <View className='flex flex-col justify-between items-start'>
              <Text className='text-budget-midnight font-bold text-md'>{transaction.merchant}</Text>
              <Text className='text-budget-tangerine font-semibold text-sm'>{transaction.category}</Text>
              <Text className='text-budget-midnight text-sm'>{transaction.date}</Text>
            </View>
            <Text className='text-budget-charcoal font-bold text-xl'>
              ${transaction.amount}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}