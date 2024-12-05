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

export const aggregateExpensesByMonth = (transactions: Transaction[]): { [key: string]: number } => {
  const expensesByMonth: { [key: string]: number } = {};

  transactions.forEach(transaction => {
    if (transaction.type === 'expense') {
      const month = moment(transaction.date, 'ddd, MMM D • h:mm A').format('MMM YYYY');
      if (!expensesByMonth[month]) {
        expensesByMonth[month] = 0;
      }
      expensesByMonth[month] += transaction.amount;
    }
  });

  return expensesByMonth;
};
