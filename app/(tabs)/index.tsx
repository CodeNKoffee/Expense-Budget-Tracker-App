import React, { useEffect, useState } from 'react';
import { ScrollView, View, Dimensions, StyleSheet, SafeAreaView, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { ThemedText } from '@/components/shared/ThemedText';
import { calculateTotalExpenses, calculateTotalIncome, getGreeting } from '@/utils';
import RecentTransactions from '@/components/RecentTransactions';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppDispatch';
import { fetchTransactions } from '@/redux/transactionsSlice';
import { useTranslation } from 'react-i18next';
import { formatCurrency } from '@/utils';
import { useCurrency } from '../_layout';

const chartConfig = {
  backgroundGradientFrom: '#101010',
  backgroundGradientTo: '#101010',
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  strokeWidth: 2,
  propsForDots: {
    r: '4',
    strokeWidth: '2',
    stroke: '#ffa726',
  },
};

export default function HomeScreen() {
  const screenWidth = Dimensions.get('window').width;
  const { t } = useTranslation();
  const { currency } = useCurrency();

  const dispatch = useAppDispatch(); // Use useAppDispatch instead of useDispatch
  const transactions = useAppSelector(state => state.transactions.transactions);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use dispatch directly with fetchTransactions()
    dispatch(fetchTransactions()).then(() => {
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  }, [dispatch]);

  const totalIncome = calculateTotalIncome(transactions);
  const totalExpenses = calculateTotalExpenses(transactions);
  const remainingBalance = totalIncome - totalExpenses;

  return (
    <SafeAreaView className='flex-1 bg-budget-charcoal'>
      {loading ? (
        <Text className="text-center text-budget-snow text-2xl font-bold flex justify-center items-center">{t('loading')}</Text>
      ) : (
        <ScrollView className='px-8 py-4 flex flex-col'>
          {/* Header */}
          <View className='mb-12 items-center'>
            <ThemedText style={styles.greeting}>{t(getGreeting())} Hatem 💸</ThemedText>
          </View>

          {/* Financial Stats */}
          <View className='flex flex-row justify-between mb-12'>
            <View className='flex-1 items-center'>
              <ThemedText style={styles.statLabel}>{t('home.totalIncome')}</ThemedText>
              <ThemedText style={styles.statValue}>{formatCurrency(totalIncome, currency)}</ThemedText>
            </View>
            <View className='flex-1 items-center'>
              <ThemedText style={styles.statLabel}>{t('home.totalExpenses')}</ThemedText>
              <ThemedText style={styles.statValue}>{formatCurrency(totalExpenses, currency)}</ThemedText>
            </View>
            <View className='flex-1 items-center'>
              <ThemedText style={styles.statLabel}>{t('home.remainingBalance')}</ThemedText>
              <ThemedText style={styles.statValue}>{formatCurrency(remainingBalance, currency)}</ThemedText>
            </View>
          </View>

          {/* Line Chart */}
          <View className='mb-10'>
            <ThemedText style={styles.chartTitle}>{t('home.spendingOverTime')}</ThemedText>
            <LineChart
              data={{
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [
                  {
                    data: [100, 200, 150, 300, 250, 400],
                  },
                ],
              }}
              width={screenWidth - 40}
              height={200}
              chartConfig={chartConfig}
              bezier
            />
          </View>

          {/* Recent Transactions List */}
          <RecentTransactions />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  greeting: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    color: '#7F7F7F',
    marginBottom: 5,
  },
  statValue: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
  },
  chartTitle: {
    fontSize: 16,
    color: '#FFF',
    marginBottom: 10,
    alignSelf: 'center',
    fontWeight: '600',
  },
});