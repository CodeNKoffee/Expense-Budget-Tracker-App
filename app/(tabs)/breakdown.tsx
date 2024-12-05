import React, { useEffect, useState } from 'react';
import { ScrollView, Dimensions, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PieChart, StackedBarChart } from 'react-native-chart-kit';
import { useTranslation } from 'react-i18next';

import SplashScreen from '@/components/shared/SplashScreen';
import { fetchTransactions } from '@/redux/transactionsSlice';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { barData, chartConfig, expenseData } from '@/constants';
import { ThemedText } from '../../components/shared/ThemedText';
import { ExternalLink } from '../../components/ExternalLink';

export default function BreakdownScreen() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const screenWidth = Dimensions.get('window').width;
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    dispatch(fetchTransactions())
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [dispatch]);

  return (
    <SafeAreaView className="bg-budget-charcoal flex-1">
      <ScrollView className="px-8 py-4 flex flex-col" contentContainerStyle={{ paddingBottom: 20 }}>
        <View className="mb-8 items-center">
          <ThemedText style={[styles.sectionHeader]}>
            {t('breakdown.expenseBreakdown')}
          </ThemedText>
        </View>

        {loading ? (
          <SplashScreen />
        ) : (
          <>
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
          </>
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