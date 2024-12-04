// src/store/actions/transactions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async (userId: string, thunkAPI) => {
    const response = await fetch(`https://api.example.com/transactions/${userId}`);
    const data = await response.json();
    return data;  // Return the fetched transaction data to be processed in the reducer
  }
);