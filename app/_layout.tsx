import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { createContext, useContext, useEffect, useState } from 'react';
import 'react-native-reanimated';
import '../global.css';
import { Provider } from 'react-redux';
import store from '@/redux/store';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/localization';
import { formatCurrency } from '@/utils';
import { useColorScheme } from '../hooks/useColorScheme';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Create a context to provide the currency throughout the app
const CurrencyContext = createContext({
  currency: 'USD',
  setCurrency: (currency: string) => {},
});

export const useCurrency = () => useContext(CurrencyContext);

export default function RootLayout() {
  const [currency, setCurrency] = useState('USD');
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

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
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <CurrencyContext.Provider value={{ currency, setCurrency }}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
        </CurrencyContext.Provider>
      </I18nextProvider>
    </Provider>
  );
}
