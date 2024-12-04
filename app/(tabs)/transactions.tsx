import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import TransactionForm from '@/components/TransactionForm';
import { ThemedText } from '@/components/shared/ThemedText';
import { useTranslation } from 'react-i18next';

export default function TransactionsScreen() {
  const { t } = useTranslation();

  return (
    <SafeAreaView className="flex-1 bg-budget-charcoal">
      <ScrollView className='px-8 py-4'>
        <View className='mb-8 items-center'>
          <ThemedText style={styles.sectionHeader}>{t('transactions.addTransaction')}</ThemedText>
        </View>
        <TransactionForm />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: 'bold',
    paddingTop: 16,
  },
});