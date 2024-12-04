import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, StyleSheet, Switch, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { ThemedText } from '../../components/shared/ThemedText';

export default function SettingsScreen() {
  const { t } = useTranslation();

  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('dark');
  const [currency, setCurrency] = useState('USD');
  const [language, setLanguage] = useState('en');

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

    loadSettings();
  }, []);

  const saveSetting = async (key: string, value: string) => {
    await AsyncStorage.setItem(key, value);
  };

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    saveSetting('theme', newTheme);
  };

  const handleCurrencyChange = (newCurrency: string) => {
    setCurrency(newCurrency);
    saveSetting('currency', newCurrency);
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    saveSetting('language', newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  return (
    <SafeAreaView className="flex-1 bg-budget-charcoal">
      <View className="px-8 py-4">
        <View className='mb-8 items-center'>
          <ThemedText style={styles.sectionHeader}>{t('settings.title')}</ThemedText>
        </View>

        {/* Theme Selector */}
        <View className="mb-4 flex flex-col gap-4">
          <ThemedText className='text-2xl font-bold ml-2' style={styles.label}>{t('settings.theme')}</ThemedText>
          <View className="flex flex-row justify-evenly">
            {['dark', 'light', 'system'].map((option) => (
              <TouchableOpacity
                key={option}
                onPress={() => handleThemeChange(option as 'dark' | 'light' | 'system')}
                style={[
                  styles.option,
                  theme === option && styles.selectedOption,
                ]}
              >
                <Text style={styles.optionText}>{t(`settings.themeOptions.${option}`)}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Currency Selector */}
        <View className="mb-4 flex flex-col gap-4">
          <ThemedText className='text-2xl font-bold ml-2' style={styles.label}>{t('settings.currency')}</ThemedText>
          <Picker
            selectedValue={currency}
            onValueChange={handleCurrencyChange}
            style={styles.picker}
          >
            {['USD', 'GBP', 'EUR', 'EGP', 'SAR', 'AED', 'CAD', 'RUB'].map((cur) => (
              <Picker.Item key={cur} label={cur} value={cur} />
            ))}
          </Picker>
        </View>

        {/* Language Selector */}
        <View className="mb-4 flex flex-col gap-4">
          <ThemedText className='text-2xl font-bold ml-2' style={styles.label}>{t('settings.language')}</ThemedText>
          <Picker
            selectedValue={language}
            onValueChange={handleLanguageChange}
            style={styles.picker}
          >
            {['en', 'ar-EG', 'ar-SA', 'fr', 'de', 'ru'].map((lang) => (
              <Picker.Item key={lang} label={t(`settings.languages.${lang}`)} value={lang} />
            ))}
          </Picker>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: 'bold',
    paddingTop: 16,
  },
  label: {
    color: '#FFF',
  },
  picker: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    color: '#000',
  },
  option: {
    padding: 10,
    backgroundColor: '#ACACAC',
    borderRadius: 8,
    marginHorizontal: 5,
  },
  selectedOption: {
    backgroundColor: '#F76D35',
  },
  optionText: {
    color: '#FFF',
    fontSize: 16,
  },
});