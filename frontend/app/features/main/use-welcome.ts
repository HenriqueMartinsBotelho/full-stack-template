import { useAuth } from '@/app/hooks/use-auth';
import { useLocale } from '@/app/hooks/use-locale';

export const useWelcome = () => {
  const { signOut } = useAuth();
  const { changeLocale, currentLocale } = useLocale();

  function onClickSignOut() {
    signOut();
  }

  function onValueChangeLocale(value: string) {
    changeLocale(value);
  }

  return {
    onClickSignOut,
    onValueChangeLocale,
    currentLocale,
  };
};
