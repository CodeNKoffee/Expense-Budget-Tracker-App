export interface GreetingProps {
  message: string;
}

export type ExternalLinkProps = {
  href: string;
  children: React.ReactNode;
  style?: object;
};

export interface Transaction {
  id: string;
  merchant: string;
  amount: number;
  date: string;
  description: string;
}

export interface TransactionsState {
  transactions: [],
}