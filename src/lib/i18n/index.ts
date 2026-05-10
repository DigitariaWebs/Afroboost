import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import fr from './locales/fr.json';
import en from './locales/en.json';

const deviceLocale = Localization.getLocales()[0]?.languageCode ?? 'fr';

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: { fr: { translation: fr }, en: { translation: en } },
    lng: deviceLocale === 'en' ? 'en' : 'fr',
    fallbackLng: 'fr',
    interpolation: { escapeValue: false },
    compatibilityJSON: 'v4',
  });
}

export default i18n;
