import { GreetingProps, Transaction } from "@/types";

export function getGreeting(): GreetingProps {
  const date: Date = new Date();
  const hours: number = date.getHours();
  if (hours < 12) {
    return { message: 'Good morning' };
  } else if (hours < 18) {
    return { message: 'Good afternoon' };
  } else {
    return { message: 'Good evening' };
  }
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