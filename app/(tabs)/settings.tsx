import React, { useState } from 'react';
import { SafeAreaView, View, StyleSheet, Switch, TextInput, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { ThemedText } from '../../components/shared/ThemedText';

export default function SettingsScreen() {
  const dispatch = useDispatch();
  const [isDarkMode, setIsDarkMode] = useState(false); // default value for dark mode
  const [name, setName] = useState(localStorage.getItem('name') || 'Hatem');
  const [language, setLanguage] = useState('en'); // Assuming English as default
  const [currency, setCurrency] = useState('USD'); // Default currency USD

  const handleDarkModeToggle = () => setIsDarkMode(!isDarkMode);
  
  const handleNameChange = (newName: string) => { // specify string type
    setName(newName);
    localStorage.setItem('name', newName); // Store in local storage
  };
  
  const handleLanguageChange = (lang: string) => setLanguage(lang);
  const handleCurrencyChange = (currency: string) => setCurrency(currency);

  return (
    <SafeAreaView className="flex-1 bg-budget-charcoal">
      <View className="px-8 py-4">
        <ThemedText style={styles.sectionHeader}>Settings ⚙️</ThemedText>
        
        {/* Dark Mode Toggle */}
        <View className="flex flex-row justify-between items-center mb-4">
          <ThemedText style={styles.label}>Dark Mode</ThemedText>
          <Switch value={isDarkMode} onValueChange={handleDarkModeToggle} />
        </View>

        {/* Name Input */}
        <View className="mb-4">
          <ThemedText style={styles.label}>Name</ThemedText>
          <TextInput
            value={name}
            onChangeText={handleNameChange}
            style={styles.input}
          />
        </View>

        {/* Language Selector */}
        <View className="mb-4">
          <ThemedText style={styles.label}>Language</ThemedText>
          <View className="flex flex-row justify-between">
            <Text onPress={() => handleLanguageChange('en')} style={styles.option}>
              English
            </Text>
            <Text onPress={() => handleLanguageChange('ar')} style={styles.option}>
              العربية
            </Text>
          </View>
        </View>

        {/* Currency Selector */}
        <View className="mb-4">
          <ThemedText style={styles.label}>Currency</ThemedText>
          <View className="flex flex-row justify-between">
            <Text onPress={() => handleCurrencyChange('USD')} style={styles.option}>
              USD
            </Text>
            <Text onPress={() => handleCurrencyChange('EGP')} style={styles.option}>
              EGP
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: 'bold',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#FFF',
    color: '#000',
    borderRadius: 8,
    padding: 10,
    marginTop: 8,
  },
  option: {
    color: '#FFF',
    fontSize: 16,
    padding: 10,
  },
});