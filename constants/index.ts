import { faArrowDown, faArrowUp, faMoneyBillWave, faMoneyBill, faSortAlphaDown, faSortAlphaUp } from '@fortawesome/free-solid-svg-icons';

// Home Screen
// Data for LineChart
export const lineChartConfig = {
  backgroundGradientFrom: '#101010',
  backgroundGradientTo: '#101010',
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  strokeWidth: 2,
  propsForDots: {
    r: '4',
    strokeWidth: '2',
    stroke: '#ffa726',
  },
};

// Breakdown Screen
// Data for PieChart and BarChart
export const expenseData = [
  { name: 'Rent', amount: 800, color: '#FF6384' },
  { name: 'Groceries', amount: 300, color: '#36A2EB' },
  { name: 'Utilities', amount: 150, color: '#FFCE56' },
  { name: 'Transportation', amount: 100, color: '#4BC0C0' },
  { name: 'Entertainment', amount: 75, color: '#9966FF' },
];

export const barData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  legend: ['Foodics', 'Udacity', 'Timedoor'],
  data: [
    [800, 300, 150],
    [700, 200, 100],
    [600, 400, 200],
    [500, 300, 100],
    [400, 200, 50],
    [300, 100, 75],
  ],
  barColors: ['#FF6384', '#36A2EB', '#FFCE56'],
};

export const chartConfig = {
  backgroundGradientFrom: '#101010',
  backgroundGradientTo: '#101010',
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  strokeWidth: 2,
  propsForDots: {
    r: '4',
    strokeWidth: '2',
    stroke: '#ffa726',
  },
};

// History Screen
// List of sort options
export const sortOptions = [
  { label: 'Most Recent to Oldest', icon: faArrowDown },
  { label: 'Oldest to Most Recent', icon: faArrowUp },
  { label: 'Largest Transactions', icon: faMoneyBillWave },
  { label: 'Lowest Transactions', icon: faMoneyBill },
  { label: 'Alphabetically', icon: faSortAlphaDown },
  { label: 'Reverse Alphabetically', icon: faSortAlphaUp },
];


// Settings Screen
// List of supported currencies
export const supportCurrencies = [
  'USD',
  'GBP',
  'EUR',
  'EGP',
  'SAR',
  'AED',
  'CAD',
  'RUB',
];

// List of supported languages
export const supportLanguages = [
  'en',
  'ar-EG',
  'ar-SA',
  'fr',
  'de',
  'ru',
];
