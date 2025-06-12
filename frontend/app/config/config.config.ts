import type { ThemeConfig } from '@/app/common/models/theme-config';
import { messages } from '@/app/i18n';
import routes from '@/app/routes';
import theme from '@/app/theme';

type AppConfig = {
  routes: typeof routes;
  theme: ThemeConfig;
  defaultLanguage: string;
  i18nMessages: typeof messages;
  apiUrl: string;
};

export function getConfig(): AppConfig {
  const apiUrl = import.meta.env.VITE_API_URL;
  const defaultLanguage = 'pt';
  const i18nMessages = messages;

  return {
    routes,
    theme,
    defaultLanguage,
    i18nMessages,
    apiUrl,
  };
}
