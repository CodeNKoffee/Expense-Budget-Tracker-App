import React from 'react';
import { ScrollView, View, Dimensions, StyleSheet, SafeAreaView, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { ThemedText } from '@/components/ThemedText';
import { getGreeting } from '@/utils';
import RecentTransactions from '@/components/RecentTransactions';

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
    <SafeAreaView className='flex-1 bg-budget-charcoal'>
      <ScrollView className='px-8 py-4 flex flex-col'>
        {/* Header */}
        <View className='mb-12 items-center'>
          <ThemedText style={styles.greeting}>{getGreeting().message}, Hatem</ThemedText>
        </View>

        {/* Financial Stats */}
        <View className='flex flex-row justify-between mb-12'>
          <View className='flex-1 items-center'>
            <ThemedText style={styles.statLabel}>Total Income</ThemedText>
            <ThemedText style={styles.statValue}>${totalIncome.toFixed(2)}</ThemedText>
          </View>
          <View className='flex-1 items-center'>
            <ThemedText style={styles.statLabel}>Total Expenses</ThemedText>
            <ThemedText style={styles.statValue}>${totalExpenses.toFixed(2)}</ThemedText>
          </View>
          <View className='flex-1 items-center'>
            <ThemedText style={styles.statLabel}>Remaining</ThemedText>
            <ThemedText style={styles.statValue}>${remainingBalance.toFixed(2)}</ThemedText>
          </View>
        </View>

        {/* Line Chart */}
        <View className='mb-10'>
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
        <RecentTransactions />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  greeting: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: 'bold',
    marginTop: 8,
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