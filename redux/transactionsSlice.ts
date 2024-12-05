import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Transaction } from '../types';
import { MockApiService } from '@/services/mockApiService';
import { v4 as uuidv4 } from 'uuid';

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
  reducers: {
    addTransaction: (state, action: PayloadAction<Omit<Transaction, 'id'>>) => {
      // Generate a unique ID for the new transaction
      const newTransaction = {
        ...action.payload,
        id: uuidv4(), // Generate a unique ID
        // Normalize the type to ensure it's either 'income' or 'expense'
        type: action.payload.type === true ? 'income' : 
              action.payload.type === false ? 'expense' : 
              action.payload.type
      };
      
      // Prepend the new transaction to the start of the array
      state.transactions.push(newTransaction);
    },
  },
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
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.transactions = state.transactions.filter(
          transaction => transaction.id !== action.payload
        );
      });
  },
});

export const { addTransaction } = transactionsSlice.actions;
export default transactionsSlice.reducer;