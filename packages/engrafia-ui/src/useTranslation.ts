import { useRouter } from 'next/router';
import React from 'react';
import { getI18nConfig, I18nConfig } from './get-i18n';

export function useTranslate() {
  const { locale, defaultLocale } = useRouter();

  const language = locale ?? defaultLocale ?? '';
  const [translations, setTranslations] = React.useState({} as I18nConfig);

  function handleTranslations() {
    getI18nConfig(language).then((resp) => setTranslations(resp));
  }

  React.useEffect(() => {
    handleTranslations();
  }, []);

  return (key: string) => {
    return translations[key] ?? key;
  };
}
