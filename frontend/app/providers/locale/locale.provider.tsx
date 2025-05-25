import React, { type ReactNode, useState, useCallback } from 'react';
import { IntlProvider } from 'react-intl';

import { LocaleContext } from '@/app/providers/locale/locale.context';
import { getConfig } from '@/app/config/config.config';

interface Props {
  children: ReactNode;
}

type State = {
  language: string;
  messages: Record<string, string>;
};

export const LocaleProvider = ({ children }: Props) => {
  const config = getConfig();

  type SupportedLanguage = keyof typeof config.i18nMessages;

  const [state, setState] = useState<State>({
    language: config.defaultLanguage,
    messages:
      config.i18nMessages[config.defaultLanguage as SupportedLanguage] ||
      config.i18nMessages.pt,
  });

  const changeLocale = useCallback(
    (language: string) => {
      if (!language || !config.i18nMessages[language as SupportedLanguage]) {
        console.warn(
          `Language "${language}" is not supported. Reverting to default.`
        );
        const defaultLang = config.defaultLanguage as SupportedLanguage;
        setState({
          language: defaultLang,
          messages: config.i18nMessages[defaultLang],
        });
        return;
      }

      if (language !== config.defaultLanguage) {
        const defaultLangKey = config.defaultLanguage as SupportedLanguage;
        const targetLangKey = language as SupportedLanguage;
        const messages = {
          ...config.i18nMessages[defaultLangKey],
          ...config.i18nMessages[targetLangKey],
        };

        setState({ language, messages });
      } else {
        const langKey = language as SupportedLanguage;
        setState({ language, messages: config.i18nMessages[langKey] });
      }
    },
    [config]
  );

  return (
    <LocaleContext.Provider
      value={{
        changeLocale,
        currentLocale: state.language,
      }}
    >
      <IntlProvider
        locale={state.language}
        messages={state.messages}
        defaultLocale={config.defaultLanguage}
      >
        {children}
      </IntlProvider>
    </LocaleContext.Provider>
  );
};
