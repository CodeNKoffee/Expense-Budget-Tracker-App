import React, { useEffect, useState } from 'react';
import { ScrollView, View, Dimensions, SafeAreaView, Text, TouchableOpacity, Modal, TextInput } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { calculateTotalExpenses, calculateTotalIncome, getGreeting } from '@/utils';
import RecentTransactions from '@/components/RecentTransactions';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppDispatch';
import { fetchTransactions } from '@/redux/transactionsSlice';
import { useTranslation } from 'react-i18next';
import { formatCurrency } from '@/utils';
import { useCurrency } from '../_layout';
import AsyncStorage from '@react-native-async-storage/async-storage';

const chartConfig = {
  backgroundGradientFrom: '#101010',
  backgroundGradientTo: '#101010',
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  strokeWidth: 2,
  propsForDots: {
    r: '4',
    strokeWidth: '2',
    stroke: '#ffa726',
  },
};

export default function HomeScreen() {
  const screenWidth = Dimensions.get('window').width;
  const { t } = useTranslation();
  const { currency } = useCurrency();

  const dispatch = useAppDispatch();
  const transactions = useAppSelector(state => state.transactions.transactions);

  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [userName, setUserName] = useState('Hatem');  // State to store the dynamic name
  const [inputValue, setInputValue] = useState('');  // For user input in the modal

  useEffect(() => {
    dispatch(fetchTransactions()).then(() => {
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  }, [dispatch]);

  const totalIncome = calculateTotalIncome(transactions);
  const totalExpenses = calculateTotalExpenses(transactions);
  const remainingBalance = totalIncome - totalExpenses;

  const handleSave = async () => {
    try {
      await AsyncStorage.setItem('userName', inputValue);
      setUserName(inputValue);  // Update the state with new value
      setModalVisible(false);  // Close the modal
    } catch (error) {
      console.error('Error saving to AsyncStorage', error);
    }
  };

  const handleModalInputChange = (text: string) => {
    setInputValue(text);
  };

  return (
    <SafeAreaView className='flex-1 bg-budget-charcoal'>
      {loading ? (
        <Text className="text-center text-budget-snow text-2xl font-bold">{t('loading')}</Text>
      ) : (
        <ScrollView className='px-8 py-4 flex flex-col'>
          {/* Header */}
          <View className='mb-12 items-center'>
            <Text className="text-2xl font-bold text-white">{t(getGreeting())} {userName} 💸</Text>
          </View>

          {/* Edit Icon with Hover Effect */}
          <TouchableOpacity
            className="absolute -bottom-4 right-0 bg-budget-steel p-3 rounded-full z-10"
            onPress={() => setModalVisible(true)}
          >
            <Text className="text-3xl text-orange-500">✏️</Text>
          </TouchableOpacity>

          {/* Financial Stats */}
          <View className='flex flex-row justify-between mb-12'>
            <View className='flex-1 items-center'>
              <Text className="text-sm text-gray-400 mb-1">{t('home.totalIncome')}</Text>
              <Text className="text-xl font-bold text-white">{formatCurrency(totalIncome, currency)}</Text>
            </View>
            <View className='flex-1 items-center'>
              <Text className="text-sm text-gray-400 mb-1">{t('home.totalExpenses')}</Text>
              <Text className="text-xl font-bold text-white">{formatCurrency(totalExpenses, currency)}</Text>
            </View>
            <View className='flex-1 items-center'>
              <Text className="text-sm text-gray-400 mb-1">{t('home.remainingBalance')}</Text>
              <Text className="text-xl font-bold text-white">{formatCurrency(remainingBalance, currency)}</Text>
            </View>
          </View>

          {/* Line Chart */}
          <View className='mb-10'>
            <Text className="text-lg font-semibold text-white mb-3">{t('home.spendingOverTime')}</Text>
            <LineChart
              data={{
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [
                  {
                    data: [100, 200, 150, 300, 250, 400],
                  },
                ],
              }}
              width={screenWidth - 40}
              height={200}
              chartConfig={chartConfig}
              bezier
            />
          </View>

          {/* Recent Transactions List */}
          <RecentTransactions />
        </ScrollView>
      )}

      {/* Modal for Editing Name */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="bg-white p-6 rounded-2xl w-72 items-center">
            {/* Label and Input Field */}
            <View className="mb-4 w-full">
              <Text className="text-lg font-bold mb-2 text-budget-charcoal">Enter your name</Text>
              <TextInput
                className="bg-white border-4 border-budget-tangerine mb-4 px-4 py-2 text-center rounded-2xl"
                value={inputValue}
                onChangeText={handleModalInputChange}
              />
            </View>

            {/* Action Buttons */}
            <View className="w-full flex flex-col-reverse justify-between items-center gap-4">
              <TouchableOpacity onPress={() => setModalVisible(false)} className="bg-transparent border border-orange-500 rounded-2xl w-full p-4">
                <Text className="text-orange-500 text-center font-bold">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSave} className="bg-orange-500 rounded-2xl w-full p-4">
                <Text className="text-white text-center font-bold">Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}