export type ExternalLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export interface Transaction {
  id?: string;
  merchant: string;
  category: string | null;
  amount: number;
  date: string;
  type: 'income' | 'expense' | boolean;
}

export interface TransactionsState {
  transactions: [],
}

export type TransactionListProps = {
  transactions: Transaction[];
  maxItems?: number;
  whiteBG?: boolean;
};