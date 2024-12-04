// redux/transactionsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Transaction } from '../types';
import { MockApiService } from '@/services/mockApiService';
interface TransactionsState {
  transactions: Transaction[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TransactionsState = {
  transactions: [],
  status: 'idle',
  error: null,
};

// Async Thunks
export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async (_, { rejectWithValue }) => {
    try {
      const transactions = await MockApiService.fetchTransactions();
      return transactions;
    } catch (error) {
      return rejectWithValue('Failed to fetch transactions');
    }
  }
);

export const addTransaction = createAsyncThunk(
  'transactions/addTransaction',
  async (transaction: Transaction, { rejectWithValue }) => {
    try {
      const newTransaction = await MockApiService.addTransaction(transaction);
      return newTransaction;
    } catch (error) {
      return rejectWithValue('Failed to add transaction');
    }
  }
);

export const deleteTransaction = createAsyncThunk(
  'transactions/deleteTransaction',
  async (id: string, { rejectWithValue }) => {
    try {
      await MockApiService.deleteTransaction(id);
      return id;
    } catch (error) {
      return rejectWithValue('Failed to delete transaction');
    }
  }
);

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.transactions.push(action.payload);
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.transactions = state.transactions.filter(
          transaction => transaction.id !== action.payload
        );
      });
  },
});

export default transactionsSlice.reducer;