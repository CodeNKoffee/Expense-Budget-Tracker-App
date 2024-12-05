import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { addTransaction } from '@/redux/transactionsSlice';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

const dateFormat = new Intl.DateTimeFormat('en-US', {
  weekday: 'short',
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
  hour12: true,
}).format;

const validationSchema = Yup.object({
  merchant: Yup.string().required('Merchant is required'),
  category: Yup.string().required('Category is required'),
  amount: Yup.number()
    .typeError('Amount must be a number')
    .positive('Amount must be positive')
    .required('Amount is required'),
  type: Yup.string().oneOf(['income', 'expense']).required('Transaction type is required'),
  date: Yup.string().test(
    'is-valid-date',
    'Invalid date format. Use format: Tue, 3 Dec • 3:30 PM',
    (value) =>
      !value || 
      /^([a-zA-Z]{3}), (\d{1,2}) ([a-zA-Z]{3}) • (\d{1,2}):(\d{2}) (AM|PM)$/.test(value)
  ),
});

export default function TransactionForm() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [transactionType, setTransactionType] = useState<'income' | 'expense'>('expense');
  const [useCurrentTime, setUseCurrentTime] = useState(false);

  const handleSubmit = (values: {
    merchant: string;
    category: string;
    amount: string;
    type: 'income' | 'expense';
    date: string;
  }) => {
    const transactionDate = useCurrentTime
      ? values.date
      : dateFormat(new Date());

    const newTransaction = {
      ...values,
      amount: parseFloat(values.amount),
      type: transactionType,
      date: transactionDate,
    };

    dispatch(addTransaction(newTransaction));
  };

  return (
    <Formik
      initialValues={{
        merchant: '',
        category: '',
        amount: '',
        date: '',
        type: 'expense',
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <ScrollView className="p-5">
          {/* Merchant Field */}
          <View className="mb-4">
            <Text className="text-lg font-bold mb-2 text-budget-snow">{t('transactions.merchant')}</Text>
            <TextInput
              onChangeText={handleChange('merchant')}
              onBlur={handleBlur('merchant')}
              value={values.merchant}
              className={`bg-white border-4 border-budget-tangerine mb-4 p-3 rounded-2xl ${
                errors.merchant && touched.merchant ? 'border-red-500' : ''
              }`}
            />
            {errors.merchant && touched.merchant && (
              <Text className="text-red-500 text-sm">{errors.merchant}</Text>
            )}
          </View>

          {/* Category Field */}
          <View className="mb-4">
            <Text className="text-lg font-bold mb-2 text-budget-snow">{t('transactions.category')}</Text>
            <TextInput
              onChangeText={handleChange('category')}
              onBlur={handleBlur('category')}
              value={values.category}
              className={`bg-white border-4 border-budget-tangerine mb-4 p-3 rounded-2xl ${
                errors.category && touched.category ? 'border-red-500' : ''
              }`}
            />
            {errors.category && touched.category && (
              <Text className="text-red-500 text-sm">{errors.category}</Text>
            )}
          </View>

          {/* Amount Field */}
          <View className="mb-4">
            <Text className="text-lg font-bold mb-2 text-budget-snow">{t('transactions.amount')}</Text>
            <TextInput
              onChangeText={handleChange('amount')}
              onBlur={handleBlur('amount')}
              value={values.amount}
              keyboardType="numeric"
              className={`bg-white border-4 border-budget-tangerine mb-4 p-3 rounded-2xl ${
                errors.amount && touched.amount ? 'border-red-500' : ''
              }`}
            />
            {errors.amount && touched.amount && (
              <Text className="text-red-500 text-sm">{errors.amount}</Text>
            )}
          </View>

          {/* Transaction Type - Toggle Switch */}
          <View className="mb-4">
            <Text className="text-lg font-bold mb-2 text-budget-snow">{t('transactions.transactionType')}</Text>
            <View className="flex flex-row items-center justify-between">
              <Text className="text-white text-sm">{t('transactions.expense')}</Text>
              <Switch
                value={transactionType === 'income'}
                onValueChange={(value) =>
                  setTransactionType(value ? 'income' : 'expense')
                }
                trackColor={{
                  false: '#ACACAC',
                  true: '#2A2A2A',
                }}
                thumbColor={transactionType === 'income' ? '#FF9500' : '#FF9500'}
              />
              <Text className="text-white text-sm">{t('transactions.income')}</Text>
            </View>
          </View>

          {/* Time Entry - Toggle Switch */}
          <View className="mb-">
            <Text className="text-lg font-bold mb-2 text-budget-snow">{t('transactions.transactionTime')}</Text>
            <View className="flex flex-row items-center justify-between">
              <Text className="text-white text-sm">{t('transactions.currentTime')}</Text>
              <Switch
                value={useCurrentTime} // No change here
                onValueChange={(value) => setUseCurrentTime(value)} // No change here
                trackColor={{
                  false: '#ACACAC',
                  true: '#2A2A2A',
                }}
                thumbColor={transactionType === 'income' ? '#FF9500' : '#FF9500'}
              />
              <Text className="text-white text-sm">{t('transactions.manuallyEnterTime')}</Text>
            </View>
            {useCurrentTime && ( // <-- Changed this condition
              <View className='mt-4'>
                <Text className="text-lg font-bold mb-2 text-budget-snow">{t('transactions.enterDate&Time')}</Text>
                <TextInput
                  onChangeText={handleChange('date')}
                  onBlur={handleBlur('date')}
                  value={values.date}
                  placeholderTextColor="#ACACAC"
                  className={`bg-white border-4 border-budget-tangerine mt-2 mb-4 p-3 rounded-2xl ${
                    errors.date && touched.date ? 'border-red-500' : ''
                  }`}
                />
              </View>
            )}
            {errors.date && touched.date && (
              <Text className="text-red-500 text-sm">{errors.date}</Text>
            )}
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            className="bg-budget-tangerine mt-4 py-4 rounded-2xl"
            onPress={handleSubmit as () => void}
          >
            <Text className="text-white text-center font-bold text-xl">{t('transactions.add')}</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </Formik>
  );
}