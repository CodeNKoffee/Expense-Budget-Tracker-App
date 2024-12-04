import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import TransactionForm from '@/components/TransactionForm';

export default function TransactionsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-budget-charcoal">
      <ScrollView>
        <TransactionForm />
      </ScrollView>
    </SafeAreaView>
  );
}