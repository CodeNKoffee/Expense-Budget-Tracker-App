import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TransactionForm from '../../components/TransactionForm';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'mocked-uuid'),
}));

const mockStore = configureStore();

describe('TransactionForm', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      transactions: { transactions: [] },
    });
    store.dispatch = jest.fn(); // Mock dispatch
  });

  const renderComponent = () => render(
    <Provider store={store}>
      <TransactionForm />
    </Provider>
  );

  test('submits form with random values', () => {
    const { getByPlaceholderText, getByText } = renderComponent();
    fireEvent.changeText(getByPlaceholderText('Merchant'), 'Random Merchant');
    fireEvent.changeText(getByPlaceholderText('Category'), 'Random Category');
    fireEvent.changeText(getByPlaceholderText('Amount'), '123.45');
    fireEvent.press(getByText('Add'));

    expect(store.dispatch).toHaveBeenCalledWith({
      type: 'transactions/addTransaction',
      payload: expect.objectContaining({
        merchant: 'Random Merchant',
        category: 'Random Category',
        amount: 123.45,
        id: 'mocked-uuid',
      }),
    });
  });
});