import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactions } from '../../redux/actions/transactions';
import { ThemedText } from '../../components/shared/ThemedText';
import { RootState } from '../../redux/store';

export default function HistoryScreen() {
  const dispatch = useDispatch();
  const transactions = useSelector((state: RootState) => state.transactions);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Dispatch action to fetch transactions
    dispatch(fetchTransactions());
    setLoading(false);
  }, [dispatch]);

  return (
    <SafeAreaView className="flex-1 bg-budget-charcoal">
      <ScrollView className="px-8 py-4">
        <View className="mb-8">
          <ThemedText style={styles.sectionHeader}>Transaction History 🏦</ThemedText>
        </View>

        {loading ? (
          <Text className="text-center text-white">Loading...</Text>
        ) : (
          transactions.slice(0, 10).map((transaction) => (
            <View key={transaction.id} className='border-b-[0.5px] border-budget-silver w-full py-4 flex flex-row justify-between items-center'>
              <View className='flex flex-col justify-between items-start'>
                <Text className='text-budget-midnight font-bold text-md'>{transaction.merchant}</Text>
                <Text className='text-budget-tangerine font-semibold text-sm'>{transaction.description}</Text>
                <Text className='text-budget-midnight text-sm'>{transaction.date}</Text>
              </View>
              <Text className='text-budget-charcoal font-bold text-xl'>
                {transaction.amount}
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