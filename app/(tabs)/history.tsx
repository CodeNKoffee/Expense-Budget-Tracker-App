/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import {
  ScrollView, View, Text, SafeAreaView,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { RootState } from '@/redux/store';
import { useAppSelector } from '@/hooks/useAppDispatch';
import TransactionList from '@/components/shared/TransactionList';
import LoadingScreen from '@/components/shared/LoadingScreen';
import SortPill from '@/components/SortPill';
import { sortTransactions } from '@/utils';

export default function HistoryScreen() {
  const transactions = useAppSelector((state: RootState) => state.transactions.transactions);
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(true);
  const [sortedTransactions, setSortedTransactions] = useState([...transactions]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setSortedTransactions([...transactions]);
  }, [transactions]);

  const handleSort = (sortIndex: number) => {
    const sorted = sortTransactions([...transactions], sortIndex);
    setSortedTransactions(sorted);
  };

  return (
    <SafeAreaView className="bg-budget-charcoal flex-1">
      <ScrollView className="px-8 py-4">
        <View className="mb-8 items-center">
          <Text className="text-white text-2xl font-bold pt-4">
            {t('history.transactionHistory')}
          </Text>
        </View>
        
        <SortPill onSort={handleSort} />

        {loading ? (
          <LoadingScreen />
        ) : (
          <TransactionList transactions={sortedTransactions} listPaddingBottom={50} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
