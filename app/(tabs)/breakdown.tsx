// React and React hooks
import React, { useEffect, useState } from 'react';
// Third-party libraries
import { ScrollView, Dimensions, View, Text, I18nManager } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PieChart, StackedBarChart } from 'react-native-chart-kit';
import { useTranslation } from 'react-i18next';
// Utilities and hooks
import { fetchTransactions } from '@/redux/transactionsSlice';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { barData, chartConfig, expenseData } from '@/constants';
// Components
import SplashScreen from '@/components/shared/LoadingScreen';
import { ExternalLink } from '@/components/ExternalLink';
import LoadingScreen from '@/components/shared/LoadingScreen';

export default function BreakdownScreen() {
  const { t } = useTranslation();
  const isRTL = I18nManager.isRTL;
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
      <ScrollView
        className="flex flex-col px-8 py-4"
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View className="mb-8 items-center">
          <Text className="text-white text-2xl font-bold pt-4">
            {t('breakdown.expenseBreakdown')}
          </Text>
        </View>

        {loading ? (
          <LoadingScreen />
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
                paddingLeft="16"
              />
            </View>

            {/* Bar Chart */}
            <View className="mb-12">
              <Text className="text-white text-lg text-center font-semibold mb-2">
                {t('breakdown.incomeOverPastSixMonths')}
              </Text>
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
              <View className="mt-4 flex flex-row justify-center flex-wrap">
                {barData.legend.map((label, index) => (
                  <View
                    key={index}
                    className="mr-4 mb-2 flex flex-row items-center"
                  >
                    <View
                      className="rounded-md w-4 h-4 mr-4"
                      style={{ backgroundColor: barData.barColors[index] }}
                    />
                    <Text className="text-white text-sm">{label}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Additional Analysis */}
            <View>
              <Text className={`text-white text-base font-semibold ${isRTL ? 'text-left' : 'text-right'} mb-2`}>
                {t('breakdown.otherInsights')}
              </Text>
              <ExternalLink
                className={`text-budget-silver text-sm ${isRTL ? 'text-left' : 'text-right'}`}
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