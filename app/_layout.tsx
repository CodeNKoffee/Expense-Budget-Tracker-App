import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as Localization from 'expo-localization';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { createContext, useContext, useEffect, useState } from 'react';
import 'react-native-reanimated';
import '../global.css';
import { Provider } from 'react-redux';
import store from '@/redux/store';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/localization';
import { useColorScheme } from '../hooks/useColorScheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Currency } from '@/types';
import { I18nManager, Platform } from 'react-native';
import RNRestart from 'react-native-restart';
import AnimatedSplashScreen from '@/components/AnimatedSplashScreen';
import 'react-native-get-random-values';

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
    const isRTL = Localization.isRTL;

    // Apply RTL layout direction if the language is RTL
    if (isRTL !== I18nManager.isRTL) {
      I18nManager.forceRTL(isRTL);
      I18nManager.allowRTL(isRTL);
      // Reload the app to apply the change
      if (Platform.OS === 'android') {
        RNRestart.Restart(); // Use 'react-native-restart' for Android
      } else {
        console.warn('Please reload the app to see RTL changes!');
      }
    }
  }, []);

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