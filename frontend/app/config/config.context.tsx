import { createContext } from 'react';
import type { ThemeConfig } from '@/app/common/models/theme-config';
import { messages } from '@/app/i18n';
import type routes from '@/app/routes';

export interface Config {
  name: string;
  theme: {
    name: string;
    logo: string;
    primaryColor: string;
  };
  defaultLanguage: string;
  apiUrl: string;
  routes?: typeof routes;
  i18nMessages: typeof messages;
  themeConfig?: ThemeConfig;
  amplitudeKey: string;
}

export interface ConfigContextType {
  config: Config;
}

const defaultContext: ConfigContextType = {
  config: {
    name: '',
    theme: {
      name: '',
      logo: '',
      primaryColor: '',
    },
    defaultLanguage: '',
    apiUrl: '',
    routes: undefined,
    i18nMessages: messages,
    amplitudeKey: '',
  },
};

export const ConfigContext = createContext<ConfigContextType>(defaultContext);
