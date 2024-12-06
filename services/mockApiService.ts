import axios from 'axios';
import { Transaction } from '../types';

const MOCKAPI_BASE_URL = process.env.EXPO_PUBLIC_MOCKAPI_BASE_URL;

if (!MOCKAPI_BASE_URL) {
  throw new Error('MOCKAPI_BASE_URL is not defined');
}

export const MockApiService = {
  async fetchTransactions(): Promise<Transaction[]> {
    try {
      const response = await axios.get(MOCKAPI_BASE_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching transactions:', error);
      return [];
    }
  },

  async addTransaction(transaction: Transaction): Promise<Transaction> {
    try {
      const response = await axios.post(MOCKAPI_BASE_URL, transaction);
      return response.data;
    } catch (error) {
      console.error('Error adding transaction:', error);
      throw error;
    }
  },
};
