// store.ts
import { configureStore } from '@reduxjs/toolkit';
import transactionsReducer from './transactionsSlice';

const store = configureStore({
  reducer: {
    transactions: transactionsReducer,  // Add the transactions reducer to the store
  },
});

export type RootState = ReturnType<typeof store.getState>;  // Type for accessing the Redux state
export type AppDispatch = typeof store.dispatch;  // Type for dispatching actions in the store

export default store;