import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { StackedBarChart } from 'react-native-chart-kit';
import { useTranslation } from 'react-i18next';
import { StackedBarChartGraphProps } from '@/types';
import { barData } from '@/constants';

export default function IncomeStackedBarChart({ barData, chartConfig }: StackedBarChartGraphProps) {
  const { t } = useTranslation();
  const screenWidth = Dimensions.get('window').width;

  return (
    <View>
      <View className="mb-8">
        <Text className="text-white text-lg text-center font-semibold mb-2">
          {t('breakdown.incomeOverPastSixMonths')}
        </Text>
        <StackedBarChart
          data={barData}
          width={screenWidth - 100}
          height={180}
          chartConfig={chartConfig}
          hideLegend
          style={{
            marginLeft: 10,
          }}
        />
      </View>

      {/* Custom Legend */}
      <View className="flex flex-row justify-center flex-wrap">
        {barData.legend.map((label: string, index: number) => (
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
  );
}
