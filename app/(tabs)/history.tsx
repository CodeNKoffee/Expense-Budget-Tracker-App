import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, SafeAreaView } from "react-native";
import { RootState } from "@/redux/store";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/hooks/useAppDispatch";
import TransactionList from "@/components/shared/TransactionList";
import LoadingScreen from "@/components/shared/LoadingScreen";

export default function HistoryScreen() {
  const transactions = useAppSelector((state: RootState) => state.transactions.transactions);
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

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