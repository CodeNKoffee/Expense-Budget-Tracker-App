import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  Text 
} from 'react-native';
import { addTransaction } from '@/redux/transactionsSlice';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { Transaction } from '../types';

export default function TransactionForm() {
  const dispatch = useAppDispatch();
  const [merchant, setMerchant] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');

  const handleSubmit = () => {
    // Basic validation
    if (!merchant || !amount || !description) {
      alert('Please fill all fields');
      return;
    }

    const newTransaction: Transaction = {
      merchant,
      description,
      amount: parseFloat(amount),
      date: new Date().toLocaleString('en-US', {
        weekday: 'short', 
        month: 'short', 
        day: 'numeric', 
        hour: 'numeric', 
        minute: '2-digit', 
        hour12: true
      }),
      type,
    };

    dispatch(addTransaction(newTransaction));
    
    // Reset form
    setMerchant('');
    setDescription('');
    setAmount('');
    setType('expense');
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Merchant"
        value={merchant}
        onChangeText={setMerchant}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <TextInput
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        style={styles.input}
      />
      <View style={styles.typeContainer}>
        <TouchableOpacity 
          style={[
            styles.typeButton, 
            type === 'expense' && styles.selectedType
          ]}
          onPress={() => setType('expense')}
        >
          <Text>Expense</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.typeButton, 
            type === 'income' && styles.selectedType
          ]}
          onPress={() => setType('income')}
        >
          <Text>Income</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity 
        style={styles.submitButton} 
        onPress={handleSubmit}
      >
        <Text style={styles.submitText}>Add Transaction</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  typeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  typeButton: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  selectedType: {
    backgroundColor: '#e0e0e0',
  },
  submitButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitText: {
    color: 'white',
    fontWeight: 'bold',
  },
});