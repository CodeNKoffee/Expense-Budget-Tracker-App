import React from 'react';
import { ScrollView, Dimensions, StyleSheet, View, I18nManager } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PieChart, StackedBarChart } from 'react-native-chart-kit';
import { ThemedText } from '../../components/shared/ThemedText';
import { ExternalLink } from '../../components/ExternalLink';
import { useTranslation } from 'react-i18next';

// Data for PieChart and BarChart
const expenseData = [
  { name: 'Rent', amount: 800, color: '#FF6384' },
  { name: 'Groceries', amount: 300, color: '#36A2EB' },
  { name: 'Utilities', amount: 150, color: '#FFCE56' },
  { name: 'Transportation', amount: 100, color: '#4BC0C0' },
  { name: 'Entertainment', amount: 75, color: '#9966FF' },
];

const barData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  legend: ['Rent', 'Groceries', 'Utilities'],
  data: [
    [800, 300, 150],
    [700, 200, 100],
    [600, 400, 200],
    [500, 300, 100],
    [400, 200, 50],
    [300, 100, 75],
  ],
  barColors: ['#FF6384', '#36A2EB', '#FFCE56'],
};

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

export default function BreakdownScreen() {
  const screenWidth = Dimensions.get('window').width;
  const { t } = useTranslation();

  return (
    <SafeAreaView className="flex-1 bg-budget-charcoal">
      <ScrollView className="px-8 py-4 flex flex-col" contentContainerStyle={{ paddingBottom: 20 }}>
        <View className="mb-8 items-center">
          <ThemedText style={[styles.sectionHeader]}>
            {t('breakdown.expenseBreakdown')}
          </ThemedText>
        </View>

        {/* Pie Chart */}
        <View className="mb-12">
          <PieChart
            data={expenseData.map((item) => ({
              name: item.name,
              population: item.amount,
              color: item.color,
              legendFontColor: '#FFF',
              legendFontSize: 12,
            }))}
            width={screenWidth - 40}
            height={220}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
          />
        </View>

        {/* Bar Chart */}
        <View className="mb-12">
          <ThemedText style={styles.chartTitle}>{t('breakdown.spendingOverPastSixMonths')}</ThemedText>
          <StackedBarChart
            data={barData}
            width={screenWidth - 80}
            height={180}
            chartConfig={chartConfig}
            hideLegend={true}
            style={{
              marginHorizontal: 10,
            }}
          />
          {/* Custom Legend */}
          <View className='mt-4 flex flex-row justify-center flex-wrap'>
            {barData.legend.map((label, index) => (
              <View key={index} className='mr-4 mb-2 flex flex-row items-center'>
                <View className='w-4 h-4 mr-4 rounded-md' style={{ backgroundColor: barData.barColors[index] }} />
                <ThemedText style={styles.legendText}>{label}</ThemedText>
              </View>
            ))}
          </View>
        </View>

        {/* Additional Analysis */}
        <View>
          <ThemedText style={styles.subHeader}>{t('breakdown.otherInsights')}</ThemedText>
          <ExternalLink
            style={styles.insightText}
            href="https://hatemsoliman.dev"
          >
            {t('breakdown.insightsLink')}
          </ExternalLink>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: 'bold',
    paddingTop: 16,
  },
  chartTitle: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: '600',
    alignSelf: 'center',
    marginBottom: 10,
  },
  legendText: {
    fontSize: 14,
    color: '#FFF',
  },
  subHeader: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: '600',
    marginBottom: 5,
  },
  insightText: {
    fontSize: 14,
    color: '#7F7F7F',
  },
});