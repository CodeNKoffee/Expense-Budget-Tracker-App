import { supportCurrencies, supportLanguages } from '@/constants';

export type ExternalLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export interface EditUserNameModalProps {
  visible: boolean;
  inputValue: string;
  onInputChange: (text: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

export interface LineChartGraphProps {
  chartLabels: string[];
  chartData: number[];
}

export interface StackedBarChartGraphProps {
  barData: any;
  chartConfig: any;
}

export interface ExpenseItem {
  name: string;
  amount: number;
  color: string;
}

export interface ExpensePieChartProps {
  expenseData: ExpenseItem[];
}

export interface Transaction {
  id?: string;
  merchant: string;
  category: string | null;
  amount: number;
  date: string;
  type: 'income' | 'expense' | boolean;
}

export interface TransactionsState {
  transactions: Transaction[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export type TransactionListProps = {
  transactions: Transaction[];
  maxItems?: number;
  whiteBG?: boolean;
  listPaddingBottom?: number;
};

export interface SortPillProps { 
  onSort: (sortIndex: number) => void; 
}

// Union type of all the elements in the supportCurrencies array
export type Currency = typeof supportCurrencies[number]

// Union type of all the elements in the supportLanguages array
export type Language = typeof supportLanguages[number]
