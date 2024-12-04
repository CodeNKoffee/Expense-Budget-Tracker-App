import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, Text, SafeAreaView } from "react-native";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch";
import { fetchTransactions } from "@/redux/transactionsSlice";
import { ThemedText } from "../../components/shared/ThemedText";
import { useTranslation } from "react-i18next";
import { formatCurrency } from "@/utils";
import { useCurrency } from "../_layout";

export default function HistoryScreen() {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector((state) => state.transactions.transactions);
  const { t } = useTranslation();
  const { currency } = useCurrency();

  const [loading, setLoading] = useState(true);

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
    <SafeAreaView className="flex-1 bg-budget-charcoal">
      <ScrollView className="px-8 py-4">
        <View className="mb-8 items-center">
          <ThemedText style={styles.sectionHeader}>
            {t("history.transactionHistory")}
          </ThemedText>
        </View>

        {loading ? (
          <Text className="text-center text-white">{t("loading")}</Text>
        ) : (
          transactions.map((transaction, index) => {
            // Flip the logic every 7 transactions
            const useAlternateLogic = Math.floor(index / 3) % 2 === 1;

            return (
              <View
                key={transaction.id}
                className="border-b-[0.5px] border-budget-silver w-full py-4 flex flex-row justify-between items-center"
              >
                <View className="flex flex-col justify-between items-start">
                  <Text className="text-budget-snow font-bold text-md">{transaction.merchant}</Text>
                  <Text className="text-budget-tangerine font-semibold text-sm">
                    {transaction.category}
                  </Text>
                  <Text className="text-budget-snow text-sm">{transaction.date}</Text>
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
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    fontSize: 24,
    color: "#FFF",
    fontWeight: "bold",
    paddingTop: 16,
  },
});