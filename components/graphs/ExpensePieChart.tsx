import React from 'react';
import { View, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { ExpensePieChartProps } from '@/types';
import { chartConfig } from '@/constants';

export default function ExpensePieChart({ expenseData }: ExpensePieChartProps) {
  const screenWidth = Dimensions.get('window').width;

  return (
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
  );
};