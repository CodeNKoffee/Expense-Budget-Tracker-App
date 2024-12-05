import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import { I18nManager } from 'react-native';

import en from './locales/en.json';
import arEG from './locales/ar-EG.json';
import arSA from './locales/ar-SA.json';
import fr from './locales/fr.json';
import de from './locales/de.json';
import ru from './locales/ru.json';

// RTL language detection
const isRTLLanguage = (languageCode: string) => {
  const rtlLanguages = ['ar', 'he', 'fa'];
  return rtlLanguages.some(lang => languageCode.startsWith(lang));
};

// Detect initial language
const detectLanguage = () => {
  const deviceLanguage = Localization.getLocales()[0].languageCode;
  return deviceLanguage || 'en';
};

// Set RTL settings
const configureRTL = (languageCode: string) => {
  const shouldForceRTL = isRTLLanguage(languageCode);
  
  I18nManager.forceRTL(shouldForceRTL);
  I18nManager.allowRTL(shouldForceRTL);
};

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    lng: detectLanguage(),
    resources: {
      'en': { translation: en },
      'ar-EG': { translation: arEG },
      'ar-SA': { translation: arSA },
      'fr': { translation: fr },
      'de': { translation: de },
      'ru': { translation: ru },
    },
    interpolation: {
      escapeValue: false,
    },
    // Added detection of language changes
    detection: {
      order: ['navigator'],
    },
  });

// Configure RTL on initial load
configureRTL(i18n.language);

// Reconfigure RTL when language changes
i18n.on('languageChanged', configureRTL);

export default i18n;