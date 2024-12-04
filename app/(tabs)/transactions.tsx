import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import TransactionForm from '@/components/TransactionForm';
import { ThemedText } from '@/components/shared/ThemedText';
import { useTranslation } from 'react-i18next';
import autoTransactionBanner from '@/assets/images/auto-transaction-banner.png';

export default function TransactionsScreen() {
  const { t } = useTranslation();

  return (
    <SafeAreaView className="flex-1 bg-budget-charcoal">
      <ScrollView className='mb-16 px-8 py-4'>
        <View className='mb-8 items-center'>
          <ThemedText style={styles.sectionHeader}>{t('transactions.addTransaction')}</ThemedText>
        </View>
        <Image source={autoTransactionBanner} className='w-full h-40' resizeMode='contain' />
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