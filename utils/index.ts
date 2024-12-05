import i18n from "@/localization";
import { Transaction } from "@/types";
import moment from 'moment';

export function getGreeting(): string {
  const hours = new Date().getHours();
  if (hours < 12) return 'home.goodMorning';
  if (hours < 18) return 'home.goodAfternoon';
  return 'home.goodEvening';
}

export const calculateTotalExpenses = (transactions: Transaction[]): number => {
  return transactions
    .filter(t => t.type === 'expense')
    .reduce((total, transaction) => total + transaction.amount, 0);
};

export const calculateTotalIncome = (transactions: Transaction[]): number => {
  return transactions
    .filter(t => t.type === 'income')
    .reduce((total, transaction) => total + transaction.amount, 0);
};

export const getcategorysByType = (transactions: Transaction[]) => {
  return transactions
    .filter(t => t.type === 'expense' && t.category)
    .reduce((categorys, transaction) => {
      const desc = transaction.category || 'Uncategorized';
      categorys[desc] =
        (categorys[desc] || 0) + transaction.amount;
      return categorys;
    }, {} as Record<string, number>);
};

export const formatCurrency = (amount: number, currency: string): string => {
  const locale = i18n.language; // Get the current language/locale from i18n
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  });
  return formatter.format(amount);
};

export const getPastSixMonthsLabels = () => {
  const labels = [];
  for (let i = 5; i >= 0; i--) {
    labels.push(moment().subtract(i, 'months').format('MMM')); // Format as month name only
  }
  return labels;
};

export const aggregateExpensesByMonth = (transactions: Transaction[], labels: string[]) => {
  const expensesByMonth: { [key: string]: number } = {};

  labels.forEach(label => {
    expensesByMonth[label] = 0;
  });

  transactions.forEach(transaction => {
    if (transaction.type === 'expense') {
      const month = moment(transaction.date, 'ddd, MMM D • h:mm A').format('MMM YYYY');
      const shortMonth = moment(transaction.date, 'ddd, MMM D • h:mm A').format('MMM'); // Get short month name
      if (expensesByMonth[shortMonth] !== undefined) {
        expensesByMonth[shortMonth] += transaction.amount;
      }
    }
  });

  return expensesByMonth;
};