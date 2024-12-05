// React and React hooks
import React, { useEffect, useState } from 'react';
// Third-party libraries
import { ScrollView, View, Dimensions, SafeAreaView, Text, TouchableOpacity, Modal, TextInput, I18nManager } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { LineChart } from 'react-native-chart-kit';
// Utilities and hooks
import { getGreeting, formatCurrency, calculateTotalIncome, calculateTotalExpenses, getPastSixMonthsLabels } from '@/utils';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppDispatch';
import { fetchTransactions } from '@/redux/transactionsSlice';
import { useCurrency } from '../_layout';
// Components
import RecentTransactions from '@/components/RecentTransactions';
import SplashScreen from '@/components/shared/LoadingScreen';
import { lineChartConfig } from '@/constants';
import { StatusBar } from 'expo-status-bar';
import LoadingScreen from '@/components/shared/LoadingScreen';
import { aggregateExpensesByMonth } from '@/utils';

export default function HomeScreen() {
  const { t } = useTranslation();
  const isRTL = I18nManager.isRTL;
  const dispatch = useAppDispatch();
  const screenWidth = Dimensions.get('window').width;
  const { currency } = useCurrency();

  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [userName, setUserName] = useState('Captain');  // State to store the dynamic name
  const [inputValue, setInputValue] = useState('');  // For user input in the modal

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

  const handleSave = async () => {
    try {
      await AsyncStorage.setItem('userName', inputValue);
      setUserName(inputValue);
      setModalVisible(false);
    } catch (error) {
      console.error('Error saving to AsyncStorage', error);
    }
  };

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
              <View className='w-full flex-1 flex-row justify-between items-center'>
                <Text className="text-md text-budget-silver mb-1">{t('home.totalIncome')}</Text>
                <Text className="text-xl font-bold text-white">{formatCurrency(totalIncome, currency)}</Text>
              </View>
              <View className='w-full flex-1 flex-row justify-between items-center'>
                <Text className="text-md text-budget-silver mb-1">{t('home.totalExpenses')}</Text>
                <Text className="text-xl font-bold text-white">{formatCurrency(totalExpenses, currency)}</Text>
              </View>
              <View className='w-full flex-1 flex-row justify-between items-center'>
                <Text className="text-md text-budget-silver mb-1">{t('home.remainingBalance')}</Text>
                <Text className="text-xl font-bold text-white">{formatCurrency(remainingBalance, currency)}</Text>
              </View>
            </View>

            {/* Line Chart */}
            <View className='mb-10'>
              <Text className="text-lg font-semibold text-white text-center mb-3">{t('home.spendingOverTime')}</Text>
              <LineChart
                data={{
                  labels: chartLabels,
                  datasets: [
                    {
                      data: chartData,
                    },
                  ],
                }}
                width={screenWidth - 40}
                height={200}
                chartConfig={lineChartConfig}
                bezier
              />
            </View>

            {/* Recent Transactions List */}
            <RecentTransactions />
          </>
        )}
      </ScrollView>

      {/* Modal for Editing Name */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View className=" bg-budget-charcoal bg-opacity-50 flex-1 justify-center items-center">
          <View className="bg-white p-6 rounded-2xl w-72 flex flex-col items-center">
            <View className="w-full mb-4">
              <Text className="text-lg text-budget-charcoal font-bold mb-2">Enter your name</Text>
              <TextInput
                className="bg-white rounded-2xl border-4 border-budget-tangerine mb-4 px-4 py-2 text-center"
                value={inputValue}
                onChangeText={handleModalInputChange}
              />
            </View>

            <View className="w-full flex flex-col-reverse justify-between items-center gap-4">
              <TouchableOpacity 
                className="bg-transparent border border-orange-500 rounded-2xl w-full p-4"
                onPress={() => setModalVisible(false)} 
              >
                <Text className="text-orange-500 text-center font-bold">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                className="bg-orange-500 rounded-2xl w-full p-4"
                onPress={handleSave} 
              >
                <Text className="text-white text-center font-bold">Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}