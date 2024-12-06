import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useTranslation } from 'react-i18next';
import { lineChartConfig } from '@/constants';
import { LineChartGraphProps } from '@/types';

export default function LineChartGraph({ chartLabels, chartData }: LineChartGraphProps) {
  const { t } = useTranslation();
  const screenWidth = Dimensions.get('window').width;

  return (
    <View className='mb-10'>
      <Text className="text-lg font-semibold text-white text-center mb-3">{t('home.spendingOverTime')}</Text>
      <LineChart
        data={{
          labels: chartLabels,
          datasets: [
            {
              data: chartData,
            },
          ],
        }}
        width={screenWidth - 40}
        height={200}
        chartConfig={lineChartConfig}
        bezier
      />
    </View>
  );
};