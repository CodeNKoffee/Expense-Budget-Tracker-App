export type ExternalLinkProps = {
  href: string;
  children: React.ReactNode;
  style?: object;
};

export interface Transaction {
  id?: string;
  merchant: string;
  category: string | null;
  amount: number;
  date: string;
  type: 'income' | 'expense';
}

export interface TransactionsState {
  transactions: [],
}