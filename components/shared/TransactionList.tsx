import React from "react";
import { View, Text, ScrollView } from "react-native";
import { formatCurrency } from "@/utils";
import { useCurrency } from "@/app/_layout";
import { TransactionListProps } from "@/types";

export default function TransactionList({ transactions, maxItems, whiteBG }: TransactionListProps) {
  const { currency } = useCurrency();

  // Determine how many transactions to slice
  const sliceCount = maxItems ?? transactions.length; // Use maxItems or default to all transactions
  const transactionsToDisplay = [...transactions]
    .slice(-sliceCount) // Take the last N items
    .reverse(); // Reverse to show the most recent first

  return (
    <ScrollView
      contentContainerStyle={{ 
        paddingBottom: 50,
        flexGrow: 1
      }}
    >
      {transactionsToDisplay.slice(0, maxItems || transactions.length).map((transaction, index) => {
        const useAlternateLogic = Math.floor(index / 3) % 2 === 1;

        return (
          <View
            key={transaction.id}
            className="border-b-[0.5px] border-budget-silver w-full py-4 flex flex-row justify-between items-center"
          >
            <View className="flex flex-col justify-between items-start">
              <Text className={`${whiteBG ? 'text-budget-charcoal' : 'text-budget-snow'} font-bold text-md`}>{transaction.merchant}</Text>
              <Text className="text-budget-tangerine font-semibold text-sm">{transaction.category}</Text>
              <Text className={`${whiteBG ? 'text-budget-charcoal' : 'text-budget-snow'} text-sm`}>{transaction.date}</Text>
            </View>
            <Text
              className={`${
                transaction.type === 'income'
                  ? "text-budget-income"
                  : transaction.type === 'expense'
                  ? "text-budget-expense"
                  : useAlternateLogic
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
  );
}