// React and React hooks
import React, { useEffect } from 'react';
// Third-party libraries
import { Text, ScrollView, View, I18nManager } from "react-native";
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
// Utilities and hooks
import { RootState } from '@/redux/store';
import { formatCurrency } from '@/utils';
import { useCurrency } from '@/app/_layout';
import TransactionList from './shared/TransactionList';

export default function RecentTransactions() {
  const transactions = useSelector((state: RootState) => state.transactions.transactions);
  const { t } = useTranslation();
  const isRTL = I18nManager.isRTL;
  const { currency } = useCurrency();

  return (
    <View 
      className="rounded-3xl bg-budget-snow px-6 py-4 flex flex-col" 
      style={{ height: 250 }}
    >
      <View className={`w-full flex ${isRTL ? 'items-start' : 'items-end'}`}>
        <Text
          className={`text-lg font-bold text-budget-silver pb-2`}
        >
          {t('home.recentTransactions')}
        </Text>
      </View>
      <TransactionList transactions={transactions} maxItems={10} whiteBG />
    </View>
  );
}