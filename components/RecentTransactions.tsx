import { Text, ScrollView, View } from "react-native";

export default function RecentTransactions() {
  // Dummy transaction data
  const recentTransactions = [
    { id: 1, merchant: 'Oscar Stores', date: 'Tue, 25 May • 4:40 PM', amount: '$200', description: 'Groceries' },
    { id: 2, merchant: 'Bolt', date: 'Mon, 18 May • 12:10 PM', amount: '$50', description: 'Transportation' },
    { id: 3, merchant: 'Shahid', date: 'Wed, 12 May • 2:49 AM', amount: '$150', description: 'Entertainment' },
    { id: 4, merchant: 'AirBnB', date: 'Sun, 5 January • 1:19 AM', amount: '$300', description: 'Rent' },
    { id: 5, merchant: 'Restless Coffeehouse', date: 'Sat, 4 January • 3:40 PM', amount: '$20', description: 'Coffee' },
    // Add more transactions as needed
  ];

  return (
    <View className='rounded-3xl bg-budget-snow px-6 py-4' style={{ height: 250 }}>
      <Text className='text-lg font-bold text-budget-silver pb-2'>Recent Transactions</Text>
      <ScrollView>
        {recentTransactions.slice(0, 10).map((transaction) => (
          <View key={transaction.id} className='border-b-[0.5px] border-budget-silver w-full py-4 flex flex-row justify-between items-center'>
            <View className='flex flex-col justify-between items-start'>
              <Text className='text-budget-midnight font-bold text-md'>{transaction.merchant}</Text>
              <Text className='text-budget-tangerine font-semibold text-sm'>{transaction.description}</Text>
              <Text className='text-budget-midnight text-sm'>{transaction.date}</Text>
            </View>
            <Text className='text-budget-charcoal font-bold text-xl'>
              {transaction.amount}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}