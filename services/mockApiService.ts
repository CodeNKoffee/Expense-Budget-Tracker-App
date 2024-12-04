import axios from 'axios';
import { Transaction } from '../types';

const MOCKAPI_BASE_URL = "XXXXXXXX"

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

  async updateTransaction(id: string, transaction: Transaction): Promise<Transaction> {
    try {
      const response = await axios.put(`${MOCKAPI_BASE_URL}/${id}`, transaction);
      return response.data;
    } catch (error) {
      console.error('Error updating transaction:', error);
      throw error;
    }
  },

  async deleteTransaction(id: string): Promise<void> {
    try {
      await axios.delete(`${MOCKAPI_BASE_URL}/${id}`);
    } catch (error) {
      console.error('Error deleting transaction:', error);
      throw error;
    }
  }
};