import { createContext } from 'react';

interface LocaleContextType {
  currentLocale: string;
  changeLocale: (locale: string) => void;
}

const defaultContext: LocaleContextType = {
  currentLocale: '',
  changeLocale: (locale: string) => {},
};

export const LocaleContext = createContext<LocaleContextType>(defaultContext);
