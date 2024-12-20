import React, { useState, useEffect, useCallback } from 'react';
import {
  SafeAreaView, View, StyleSheet, Text, TouchableOpacity, ScrollView, RefreshControl, Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { supportCurrencies, supportLanguages } from '@/constants';
import { Currency, Language } from '@/types';
import LoadingScreen from '@/components/shared/LoadingScreen';

export default function SettingsScreen() {
  const { t } = useTranslation();

  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('dark');
  const [currency, setCurrency] = useState<Currency>('USD');
  const [language, setLanguage] = useState<Language>('en');
  const [refreshing, setRefreshing] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  // Load settings from AsyncStorage when component mounts
  useEffect(() => {
    const loadSettings = async () => {
      const savedTheme = (await AsyncStorage.getItem('theme')) || 'dark';
      const savedCurrency = (await AsyncStorage.getItem('currency')) || 'USD';
      const savedLanguage = (await AsyncStorage.getItem('language')) || 'en';

      setTheme(savedTheme as 'light' | 'dark' | 'system');
      setCurrency(savedCurrency);
      setLanguage(savedLanguage);
      i18n.changeLanguage(savedLanguage);
    };

    loadSettings().then(() => setInitialLoad(false));
  }, []);

  const saveSetting = async (key: string, value: string) => {
    await AsyncStorage.setItem(key, value);
  };

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    if (theme !== newTheme) {
      setTheme(newTheme);
      saveSetting('theme', newTheme);
      if (!initialLoad) Alert.alert(t('settings.savedMessage'));
    }
  };

  const updateCurrency = async (newCurrency: Currency) => {
    await AsyncStorage.setItem('currency', newCurrency);
    setCurrency(newCurrency);
    if (!initialLoad) Alert.alert(t('settings.savedMessage')); // Show alert only if not initial load
  };

  const handleCurrencyChange = (newCurrency: string) => {
    updateCurrency(newCurrency);
  };

  const handleLanguageChange = (newLanguage: string) => {
    if (language !== newLanguage) {
      setLanguage(newLanguage);
      saveSetting('language', newLanguage);
      i18n.changeLanguage(newLanguage);
      if (!initialLoad) Alert.alert(t('settings.savedMessage')); // Show alert only if not initial load
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(async () => {
      const savedCurrency = (await AsyncStorage.getItem('currency')) || 'USD';
      setCurrency(savedCurrency);
      setRefreshing(false);
      Alert.alert(t('settings.refreshedMessage'));
    }, 1000);
  }, [t]);

  return (
    <SafeAreaView className="bg-budget-charcoal flex-1">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View className="px-8 py-4">
          <View className="mb-8 items-center">
            <Text className="text-white text-2xl font-bold pt-4">{t('settings.title')}</Text>
          </View>

          {/* Theme Selector */}
          <View className="mb-4 flex flex-col gap-4">
            <Text className="text-lg font-bold text-center ml-2" style={styles.label}>
              {t('settings.theme')}
            </Text>
            <View className="flex flex-row justify-evenly">
              {['dark', 'light', 'system'].map((option) => (
                <TouchableOpacity
                  key={option}
                  onPress={() => handleThemeChange(option as 'dark' | 'light' | 'system')}
                  style={[
                    styles.option,
                    theme === option && styles.selectedOption,
                    theme === 'dark' && option !== 'dark' && styles.disabledOption,
                  ]}
                  disabled={theme === 'dark' && option !== 'dark'}
                >
                  <Text style={styles.optionText}>{t(`settings.themeOptions.${option}`)}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Currency Selector */}
          <View className="mb-4 flex flex-col gap-4">
            <Text className="text-lg font-bold text-center ml-2" style={styles.label}>
              {t('settings.currency')}
            </Text>
            <Picker selectedValue={currency} onValueChange={handleCurrencyChange} style={styles.picker}>
              {supportCurrencies.map((cur) => (
                <Picker.Item key={cur} label={cur} value={cur} />
              ))}
            </Picker>
          </View>

          {/* Language Selector */}
          <View className="mb-4 flex flex-col gap-4">
            <Text className="text-lg font-bold text-center ml-2" style={styles.label}>
              {t('settings.language')}
            </Text>
            <Picker selectedValue={language} onValueChange={handleLanguageChange} style={styles.picker}>
              {supportLanguages.map((lang) => (
                <Picker.Item key={lang} label={t(`settings.languages.${lang}`)} value={lang} />
              ))}
            </Picker>
          </View>

          {refreshing && <LoadingScreen />}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  label: {
    color: '#FFF',
  },
  picker: {
    backgroundColor: '#F5F5F5',
    borderRadius: 24,
    color: '#000',
  },
  option: {
    padding: 10,
    backgroundColor: '#ACACAC',
    borderRadius: 8,
    marginHorizontal: 8,
  },
  selectedOption: {
    backgroundColor: '#F76D35',
  },
  disabledOption: {
    backgroundColor: '#2A2A2A',
  },
  optionText: {
    color: '#FFF',
    fontSize: 16,
  },
});
