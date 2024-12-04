import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppDispatch';
import { fetchTransactions } from '@/redux/transactionsSlice';
import { ThemedText } from '../../components/shared/ThemedText';
import { useTranslation } from 'react-i18next';

export default function HistoryScreen() {
  const dispatch = useAppDispatch(); // Use useAppDispatch instead of useDispatch
  const transactions = useAppSelector(state => state.transactions.transactions);
  const { t } = useTranslation();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use dispatch directly with fetchTransactions()
    dispatch(fetchTransactions()).then(() => {
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  }, [dispatch]);

  return (
    <SafeAreaView className="flex-1 bg-budget-charcoal">
      <ScrollView className="px-8 py-4">
        <View className="mb-8">
          <ThemedText style={styles.sectionHeader}>{t('history.transactionHistory')}</ThemedText>
        </View>

        {loading ? (
          <Text className="text-center text-white">{t('loading')}</Text>
        ) : (
          transactions.slice(0, 10).map((transaction) => (
            <View key={transaction.id} className='border-b-[0.5px] border-budget-silver w-full py-4 flex flex-row justify-between items-center'>
              <View className='flex flex-col justify-between items-start'>
                <Text className='text-budget-snow font-bold text-md'>{transaction.merchant}</Text>
                <Text className='text-budget-tangerine font-semibold text-sm'>{transaction.description}</Text>
                <Text className='text-budget-snow text-sm'>{transaction.date}</Text>
              </View>
              <Text className='text-budget-snow font-bold text-xl'>
                ${transaction.amount}
              </Text>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: 'bold',
  },
});