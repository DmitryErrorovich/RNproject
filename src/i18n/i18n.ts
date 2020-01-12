import i18n from 'i18n-js';
import { NativeModules, Platform } from 'react-native';

import en from './locales/en.json';

const deviceLanguage = Platform.OS === 'ios' ?
    NativeModules.SettingsManager.settings.AppleLocale :
    NativeModules.I18nManager.localeIdentifier;

i18n.defaultLocale = 'en';
i18n.locale = deviceLanguage;
i18n.fallbacks = true;
i18n.translations = { en };

export { i18n };
