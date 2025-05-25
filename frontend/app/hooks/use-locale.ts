import { useContext } from 'react';
import { LocaleContext } from 'app/providers/locale';

export const useLocale = () => {
  return useContext(LocaleContext);
};
