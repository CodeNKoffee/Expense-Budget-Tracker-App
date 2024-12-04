import { Transaction } from "@/types";

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

export const getDescriptionsByType = (transactions: Transaction[]) => {
  return transactions
    .filter(t => t.type === 'expense' && t.description)
    .reduce((descriptions, transaction) => {
      const desc = transaction.description || 'Uncategorized';
      descriptions[desc] = 
        (descriptions[desc] || 0) + transaction.amount;
      return descriptions;
    }, {} as Record<string, number>);
};