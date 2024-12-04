import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { addTransaction } from '@/redux/transactionsSlice';
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  merchant: Yup.string().required('Merchant is required'),
  description: Yup.string().required('Description is required'),
  amount: Yup.number()
    .typeError('Amount must be a number')
    .positive('Amount must be positive')
    .required('Amount is required'),
  type: Yup.string().oneOf(['income', 'expense']).required('Transaction type is required'),
});

export default function TransactionForm() {
  const dispatch = useAppDispatch();
  const [transactionType, setTransactionType] = useState<'income' | 'expense'>('expense');

  const handleSubmit = (values: {
    merchant: string;
    description: string;
    amount: string;
    type: 'income' | 'expense';
  }) => {
    const newTransaction = {
      ...values,
      amount: parseFloat(values.amount),
      type: transactionType,
      date: new Date().toLocaleString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }),
    };

    dispatch(addTransaction(newTransaction));
  };

  return (
    <Formik
      initialValues={{
        merchant: '',
        description: '',
        amount: '',
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View className="p-5">
          {/* Merchant Field */}
          <View className="mb-4">
            <Text className="text-sm font-bold mb-1 text-gray-600">Merchant</Text>
            <TextInput
              onChangeText={handleChange('merchant')}
              onBlur={handleBlur('merchant')}
              value={values.merchant}
              className={`bg-white border-4 border-budget-tangerine p-3 rounded-2xl ${
                errors.merchant && touched.merchant ? 'border-red-500' : ''
              }`}
            />
            {errors.merchant && touched.merchant && (
              <Text className="text-red-500 text-sm">{errors.merchant}</Text>
            )}
          </View>

          {/* Description Field */}
          <View className="mb-4">
            <Text className="text-sm font-bold mb-1 text-gray-600">Description</Text>
            <TextInput
              onChangeText={handleChange('description')}
              onBlur={handleBlur('description')}
              value={values.description}
              className={`bg-white border-4 border-budget-tangerine p-3 rounded-2xl ${
                errors.description && touched.description ? 'border-red-500' : ''
              }`}
            />
            {errors.description && touched.description && (
              <Text className="text-red-500 text-sm">{errors.description}</Text>
            )}
          </View>

          {/* Amount Field */}
          <View className="mb-4">
            <Text className="text-sm font-bold mb-1 text-gray-600">Amount</Text>
            <TextInput
              onChangeText={handleChange('amount')}
              onBlur={handleBlur('amount')}
              value={values.amount}
              keyboardType="numeric"
              className={`bg-white border-4 border-budget-tangerine p-3 rounded-2xl ${
                errors.amount && touched.amount ? 'border-red-500' : ''
              }`}
            />
            {errors.amount && touched.amount && (
              <Text className="text-red-500 text-sm">{errors.amount}</Text>
            )}
          </View>

          {/* Transaction Type - Toggle Switch */}
          <View className="mb-4">
            <Text className="text-sm font-bold mb-1 text-gray-600">Transaction Type</Text>
            <View className="flex flex-row items-center justify-center bg-budget-steel rounded-full w-40 h-12">
              <TouchableOpacity
                onPress={() => setTransactionType('expense')}
                className={`w-8 h-8 rounded-full ${
                  transactionType === 'expense' ? 'bg-budget-tangerine' : 'bg-budget-silver'
                }`}
              />
              <Text className="text-white text-sm mx-3">Expense</Text>
              <TouchableOpacity
                onPress={() => setTransactionType('income')}
                className={`w-8 h-8 rounded-full ${
                  transactionType === 'income' ? 'bg-budget-tangerine' : 'bg-budget-silver'
                }`}
              />
              <Text className="text-white text-sm mx-3">Income</Text>
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            className="bg-budget-tangerine py-4 rounded-2xl"
            onPress={handleSubmit as () => void}
          >
            <Text className="text-white text-center font-bold text-xl">Add Transaction</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
}