import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import TransactionForm from '../../components/TransactionForm';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../localization';

describe('TransactionForm', () => {
  const mockStore = configureStore();
  const store = mockStore({
    transactions: {
      transactions: [],
      status: 'idle',
      error: null,
    },
  });

  const renderComponent = () =>
    render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <TransactionForm />
        </I18nextProvider>
      </Provider>
    );

  test('submits transaction with both switches toggled', () => {
    const { getByText, getAllByRole, getByPlaceholderText } = renderComponent();

    // Find all switches
    const switches = getAllByRole('switch');

    // Toggle transaction type to income
    fireEvent(switches[0], 'valueChange', true);

    // Toggle time entry to manual
    fireEvent(switches[1], 'valueChange', true);

    // Fill out transaction details
    fireEvent.changeText(
      getByPlaceholderText(/merchant/i),
      'Foodics'
    );

    fireEvent.changeText(
      getByPlaceholderText(/category/i),
      'Mobile App Development'
    );

    fireEvent.changeText(
      getByPlaceholderText(/amount/i),
      '1600.00'
    );

    fireEvent.changeText(
      getByPlaceholderText(/enter date/i),
      'Tue, 1 Feb • 12:30 AM'
    );

    // Submit transaction
    fireEvent.press(getByText('Add Transaction'));

    // Get dispatched actions
    const dispatchSpy = store.getActions();
    expect(dispatchSpy.length).toBe(1);
    expect(dispatchSpy[0].type).toBe('transactions/addTransaction');
    expect(dispatchSpy[0].payload.type).toBe('income');
  });
});