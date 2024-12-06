import { createContext, useContext, useEffect, useState } from 'react';

import 'react-native-reanimated';
import 'react-native-get-random-values';

import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';

import '../global.css';

import store from '@/redux/store';
import { useColorScheme } from '../hooks/useColorScheme';
import { Currency } from '@/types';
import AnimatedSplashScreen from '@/components/AnimatedSplashScreen';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Set the animation options. This is optional.
SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

// Create a context to provide the currency throughout the app
const CurrencyContext = createContext({
  currency: 'USD',
  setCurrency: (currency: Currency) => {},
});

export const useCurrency = () => useContext(CurrencyContext);

export default function RootLayout() {
  const [currency, setCurrency] = useState<Currency>('USD');
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const [showSplash, setShowSplash] = useState<boolean>(true);

  useEffect(() => {
    const loadCurrency = async () => {
      const storedCurrency = await AsyncStorage.getItem('currency');
      if (storedCurrency) {
        setCurrency(storedCurrency);
      }
    };
    loadCurrency();
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync().then(() => {
        setTimeout(() => {
          setShowSplash(false);
        }, 2000);
      });
    }
  }, [loaded]);

  if (!loaded || showSplash) {
    return <AnimatedSplashScreen />;
  }

  return (
    <Provider store={store}>
      <CurrencyContext.Provider value={{ currency, setCurrency }}>
        <ThemeProvider
          value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
        >
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="light" />
        </ThemeProvider>
      </CurrencyContext.Provider>
    </Provider>
  );
}
