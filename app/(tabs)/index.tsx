import React from 'react';
import { ScrollView, View, Dimensions, StyleSheet, SafeAreaView, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Colors } from '@/constants/Colors';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { getGreeting } from '@/utils';

// Dummy transaction data
const recentTransactions = [
  { id: 1, merchant: 'Oscar Stores', date: 'Tue, 25 May • 4:40 PM', amount: '$200', description: 'Groceries' },
  { id: 2, merchant: 'Bolt', date: 'Mon, 18 May • 12:10 PM', amount: '$50', description: 'Transportation' },
  { id: 3, merchant: 'Shahid', date: 'Wed, 12 May • 2:49 AM', amount: '$150', description: 'Entertainment' },
  { id: 4, merchant: 'AirBnB', date: 'Sun, 5 January • 1:19 AM', amount: '$300', description: 'Rent' },
  { id: 5, merchant: 'Resltess Coffeehouse', date: 'Sat, 4 January • 3:40 PM', amount: '$20', description: 'Coffee' },
  // Add more transactions as needed
];

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
  const totalIncome = 5000;
  const totalExpenses = 800;
  const remainingBalance = totalIncome - totalExpenses;

  const screenWidth = Dimensions.get('window').width;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <ThemedText style={styles.greeting}>{getGreeting().message}, Hatem</ThemedText>
        </View>

        {/* Financial Stats */}
        <View style={styles.statContainer}>
          <View style={styles.statItem}>
            <ThemedText style={styles.statLabel}>Total Income</ThemedText>
            <ThemedText style={styles.statValue}>${totalIncome.toFixed(2)}</ThemedText>
          </View>
          <View style={styles.statItem}>
            <ThemedText style={styles.statLabel}>Total Expenses</ThemedText>
            <ThemedText style={styles.statValue}>${totalExpenses.toFixed(2)}</ThemedText>
          </View>
          <View style={styles.statItem}>
            <ThemedText style={styles.statLabel}>Remaining</ThemedText>
            <ThemedText style={styles.statValue}>${remainingBalance.toFixed(2)}</ThemedText>
          </View>
        </View>

        {/* Line Chart */}
        <View style={styles.chartContainer}>
          <ThemedText style={styles.chartTitle}>Spending Over Time</ThemedText>
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
        <View className='rounded-3xl bg-budget-snow px-6 py-4' style={styles.chartContainer}>
          <Text className='text-lg font-bold text-budget-silver '>Recent Transactions</Text>
          <ScrollView>
            {recentTransactions.slice(0, 10).map((transaction) => (
              <View key={transaction.id} className='border-b-[0.5px] border-budget-silver w-full py-4 flex flex-row justify-between items-center'>
                <View className='flex lex-col justify-between items-start'>
                  <Text className='text-budget-midnight font-bold text-md'>{transaction.merchant}</Text>
                  <Text className='text-budget-tangerine font-semibold text-sm'>{transaction.description}</Text>
                  <Text className='text-budget-midnight text-sm'>{transaction.date}</Text>
                </View>
                <Text className='text-budget-charcoal font-bold text-xl'>
                  {transaction.amount}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#101010',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  greeting: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: 'bold',
  },
  statContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
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
  chartContainer: {
    marginBottom: 30,
  },
  chartTitle: {
    fontSize: 16,
    color: '#FFF',
    marginBottom: 10,
    alignSelf: 'center',
    fontWeight: '600',
  },
  transactionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});