import React from 'react';
import { Text, ScrollView, View, I18nManager } from "react-native";
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useTranslation } from 'react-i18next';
import { formatCurrency } from '@/utils';
import { useCurrency } from '@/app/_layout';

export default function RecentTransactions() {
  const transactions = useSelector((state: RootState) => state.transactions.transactions);
  const { t } = useTranslation();
  const { currency } = useCurrency();

  return (
    <View className="rounded-3xl bg-budget-snow px-6 py-4 flex flex-col" style={{ height: 250 }}>
      <Text
        className={`text-lg font-bold text-budget-silver pb-2 ${I18nManager.isRTL ? 'items-start' : 'items-end'}`}
      >
        {t('home.recentTransactions')}
      </Text>
      <ScrollView>
        {transactions.slice(0, 10).map((transaction, index) => {
          // Flip the logic every 7 transactions
          const useAlternateLogic = Math.floor(index / 3) % 2 === 1;

          return (
            <View
              key={transaction.id}
              className="border-b-[0.5px] border-budget-silver w-full py-4 flex flex-row justify-between items-center"
            >
              <View className="flex flex-col justify-between items-start">
                <Text className="text-budget-midnight font-bold text-md">{transaction.merchant}</Text>
                <Text className="text-budget-tangerine font-semibold text-sm">{transaction.category}</Text>
                <Text className="text-budget-midnight text-sm">{transaction.date}</Text>
              </View>
              <Text
                className={`${
                  useAlternateLogic
                    ? !transaction.type
                      ? "text-budget-income"
                      : "text-budget-expense"
                    : transaction.type
                    ? "text-budget-income"
                    : "text-budget-expense"
                } font-bold text-xl`}
              >
                {formatCurrency(transaction.amount, currency)}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}