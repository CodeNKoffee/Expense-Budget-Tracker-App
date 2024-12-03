import React from 'react';
import { ScrollView, View, Dimensions, StyleSheet, SafeAreaView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Colors } from '@/constants/Colors';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { getGreeting } from '@/utils';

// Dummy transaction data
const recentTransactions = [
  { id: 1, date: '2024-11-20', amount: '$200', description: 'Groceries' },
  { id: 2, date: '2024-11-19', amount: '$50', description: 'Transportation' },
  { id: 3, date: '2024-11-18', amount: '$150', description: 'Entertainment' },
  { id: 4, date: '2024-11-17', amount: '$300', description: 'Rent' },
  { id: 5, date: '2024-11-16', amount: '$20', description: 'Coffee' },
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
        <View style={[styles.chartContainer, { backgroundColor: '#FEFEFE' }]}>
          <ThemedText style={styles.chartTitle}>Recent Transactions</ThemedText>
          <ScrollView>
            {recentTransactions.slice(0, 10).map((transaction) => (
              <View key={transaction.id} style={styles.transactionItem}>
                <ThemedText>{transaction.date}</ThemedText>
                <ThemedText>{transaction.description}</ThemedText>
                <ThemedText>{transaction.amount}</ThemedText>
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