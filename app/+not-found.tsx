import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { ThemedText } from '@/components/shared/ThemedText';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View className="bg-budget-charcoal text-budget-tangerine" style={styles.container}>
        <Text className="text-budget-snow">This screen doesn't exist.</Text>
        <Link href="/" style={styles.link}>
          <ThemedText type="link">Go to home screen!</ThemedText>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
