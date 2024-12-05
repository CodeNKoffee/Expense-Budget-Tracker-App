// React and React hooks
import React, { useEffect, useState } from "react";
// Third-party libraries
import { ScrollView, View, Text, SafeAreaView } from "react-native";
import { useTranslation } from "react-i18next";
// Utilities and hooks
import { useAppSelector } from "@/hooks/useAppDispatch";
import { useCurrency } from "../_layout";
// Components
import TransactionList from "@/components/shared/TransactionList";
import LoadingScreen from "@/components/shared/LoadingScreen";

export default function HistoryScreen() {
  const transactions = useAppSelector((state) => state.transactions.transactions);
  const { t } = useTranslation();
  const { currency } = useCurrency();

  const [loading, setLoading] = useState<boolean>(true);

  // Log transactions whenever they change
  useEffect(() => {
    console.log('Recent Transactions updated:', transactions);
    setLoading(false);
  }, [transactions]);

  return (
    <SafeAreaView className="bg-budget-charcoal flex-1">
      <ScrollView className="px-8 py-4">
        <View className="mb-8 items-center">
          <Text className="text-white text-2xl font-bold pt-4">
            {t("history.transactionHistory")}
          </Text>
        </View>

        {loading ? (
          <LoadingScreen />
        ) : (
          <TransactionList transactions={transactions} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
