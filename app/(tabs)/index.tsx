// React and React hooks
import React, { useEffect, useState } from 'react';

// Third-party libraries
import {
  ScrollView,
  View,
  SafeAreaView,
  Text,
  TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { StatusBar } from 'expo-status-bar';

// Utilities and hooks
import {
  getGreeting,
  formatCurrency,
  calculateTotalIncome,
  calculateTotalExpenses,
  getPastSixMonthsLabels,
  aggregateExpensesByMonth
} from '@/utils';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppDispatch';
import { fetchTransactions } from '@/redux/transactionsSlice';
import { useCurrency } from '../_layout';

// Components
import LoadingScreen from '@/components/shared/LoadingScreen';
import RecentTransactions from '@/components/RecentTransactions';
import EditUserNameModal from '@/components/EditUserNameModal';
import LineChartGraph from '@/components/graphs/LineChartGraph';


export default function HomeScreen() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { currency } = useCurrency();

  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [userName, setUserName] = useState('Captain');
  const [inputValue, setInputValue] = useState('');

  // Select transactions from Redux store
  const transactions = useAppSelector((state) => state.transactions.transactions);

  useEffect(() => {
    dispatch(fetchTransactions()).then(() => {
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  }, [dispatch]);

  // Calculate total income and expenses using the utility functions
  const totalIncome = calculateTotalIncome(transactions);
  const totalExpenses = calculateTotalExpenses(transactions);
  const remainingBalance = totalIncome - totalExpenses;

  const pastSixMonthsLabels = getPastSixMonthsLabels(); 
  const aggregatedExpenses = aggregateExpensesByMonth(transactions, pastSixMonthsLabels); 
  const chartLabels = pastSixMonthsLabels; 
  const chartData = pastSixMonthsLabels.map(label => aggregatedExpenses[label]);

  // Save user input to AsyncStorage
  const handleSave = async () => {
    try {
      await AsyncStorage.setItem('userName', inputValue);
      setUserName(inputValue);
      setModalVisible(false);
    } catch (error) {
      console.error('Error saving to AsyncStorage', error);
    }
  };

  // Handle input change in the modal
  const handleModalInputChange = (text: string) => {
    setInputValue(text);
  };

  return (
    <SafeAreaView className="bg-budget-charcoal flex-1">
      <StatusBar style="light" />
      <ScrollView 
        className="px-8 py-4 flex flex-col" 
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Header */}
        <View className="mb-8 flex flex-col items-center">
          <Text className="text-2xl font-bold text-white">
            {t(getGreeting())} {userName} 💸
          </Text>
        </View>

        {loading ? (
          <LoadingScreen />
        ) : (
          <>
            <TouchableOpacity
              className="absolute bottom-2 right-0 rounded-full bg-budget-steel p-3 z-10"
              onPress={() => setModalVisible(true)}
            >
              <Text className="text-3xl text-orange-500">✏️</Text>
            </TouchableOpacity>

            {/* Financial Stats */}
            <View className='flex flex-col justify-between mb-8'>
              {[
                { label: t('home.totalIncome'), value: totalIncome },
                { label: t('home.totalExpenses'), value: totalExpenses },
                { label: t('home.remainingBalance'), value: remainingBalance },
              ].map((item, index) => (
                <View key={index} className='w-full flex-1 flex-row justify-between items-center'>
                  <Text className="text-md text-budget-silver mb-1">{item.label}</Text>
                  <Text className="text-xl font-bold text-white">{formatCurrency(item.value, currency)}</Text>
                </View>
              ))}
            </View>

            <LineChartGraph chartLabels={chartLabels} chartData={chartData} />

            <RecentTransactions />
          </>
        )}
      </ScrollView>

      {/* Modal for Editing Name */}
      <EditUserNameModal 
        visible={modalVisible} 
        inputValue={inputValue} 
        onInputChange={handleModalInputChange} 
        onSave={handleSave} 
        onCancel={() => setModalVisible(false)} 
      />
    </SafeAreaView>
  );
}