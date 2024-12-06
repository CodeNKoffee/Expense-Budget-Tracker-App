// React and React hooks
import React, { useEffect, useState } from 'react';

// Third-party libraries
import {
  ScrollView, Dimensions, View, Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

// Utilities and hooks
import { fetchTransactions } from '@/redux/transactionsSlice';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { barData, chartConfig, expenseData } from '@/constants';

// Components
import { ExternalLink } from '@/components/ExternalLink';
import LoadingScreen from '@/components/shared/LoadingScreen';
import IncomeStackedBarChart from '@/components/graphs/IncomeStackedBarChart';
import ExpensePieChart from '@/components/graphs/ExpensePieChart';

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
            <ExpensePieChart expenseData={expenseData} />

            {/* Stacked Bar Chart */}
            <IncomeStackedBarChart barData={barData} chartConfig={chartConfig} />

            {/* Additional Analysis */}
            <View className="mt-8">
              <Text className="text-white text-base font-semibold text-center mb-2">
                {t('breakdown.otherInsights')}
              </Text>
              <ExternalLink
                className="text-budget-silver text-center text-sm"
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
