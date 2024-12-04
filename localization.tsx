import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import arEG from './locales/ar-EG.json';
import arSA from './locales/ar-SA.json';
import fr from './locales/fr.json';
import de from './locales/de.json';
import ru from './locales/ru.json';

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    lng: 'en',
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
  });

export default i18n;