import moment from 'moment';
import i18n from '@/localization';
import { Transaction } from '@/types';

// Get a greeting message based on the current time
export function getGreeting(): string {
  const hours = new Date().getHours();
  if (hours < 12) return 'home.goodMorning';
  if (hours < 18) return 'home.goodAfternoon';
  return 'home.goodEvening';
}

// Calculate the total expenses from a list of transactions
export const calculateTotalExpenses = (transactions: Transaction[]): number => transactions
  .filter((t) => t.type === 'expense')
  .reduce((total, transaction) => total + transaction.amount, 0);

// Calculate the total income from a list of transactions
export const calculateTotalIncome = (transactions: Transaction[]): number => transactions
  .filter((t) => t.type === 'income')
  .reduce((total, transaction) => total + transaction.amount, 0);

// Get categories by type from a list of transactions
export const getcategorysByType = (transactions: Transaction[]) => transactions
  .filter((t) => t.type === 'expense' && t.category)
  .reduce((categorys, transaction) => {
    const desc = transaction.category || 'Uncategorized';
    categorys[desc] = (categorys[desc] || 0) + transaction.amount;
    return categorys;
  }, {} as Record<string, number>);

// Format a number as currency based on the current locale
export const formatCurrency = (amount: number, currency: string): string => {
  const locale = i18n.language; // Get the current language/locale from i18n
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  });
  return formatter.format(amount);
};

// Get labels for the past six months
export const getPastSixMonthsLabels = () => {
  const labels = [];
  for (let i = 5; i >= 0; i--) {
    labels.push(moment().subtract(i, 'months').format('MMM')); // Format as month name only
  }
  return labels;
};

// Aggregate expenses by month from a list of transactions
export const aggregateExpensesByMonth = (transactions: Transaction[], labels: string[]) => {
  const expensesByMonth: { [key: string]: number } = {};

  labels.forEach((label) => {
    expensesByMonth[label] = 0;
  });

  transactions.forEach((transaction) => {
    if (transaction.type === 'expense') {
      const shortMonth = moment(transaction.date, 'ddd, MMM D • h:mm A').format('MMM'); // Get short month name
      if (expensesByMonth[shortMonth] !== undefined) {
        expensesByMonth[shortMonth] += transaction.amount;
      }
    }
  });

  return expensesByMonth;
};

// Helper function to parse the date string into a Date object
const parseDateString = (dateString: string): Date => {
  return new Date(dateString.replace('•', ',').replace(/(\d{1,2}):(\d{2}) (AM|PM)/, '$1:$2:00 $3'));
};

export const sortTransactions = (transactions: Transaction[], sortIndex: number): Transaction[] => {
  let sortedTransactions;

  switch (sortIndex) {
    case 0: // Most Recent to Oldest
      sortedTransactions = transactions.sort((a, b) => parseDateString(b.date).getTime() - parseDateString(a.date).getTime());
      break;
    case 1: // Oldest to Most Recent
      sortedTransactions = transactions.sort((a, b) => parseDateString(a.date).getTime() - parseDateString(b.date).getTime());
      break;
    case 2: // Largest Transactions
      sortedTransactions = transactions.sort((a, b) => Math.abs(b.amount) - Math.abs(a.amount));
      break;
    case 3: // Lowest Transactions
      sortedTransactions = transactions.sort((a, b) => Math.abs(a.amount) - Math.abs(b.amount));
      break;
    case 4: // Alphabetically
      sortedTransactions = transactions.sort((a, b) => a.merchant.localeCompare(b.merchant));
      break;
    case 5: // Reverse Alphabetically
      sortedTransactions = transactions.sort((a, b) => a.merchant.localeCompare(b.merchant)).reverse();
      break;
    default:
      sortedTransactions = transactions;
      break;
    }
  return sortedTransactions.reverse();
};

