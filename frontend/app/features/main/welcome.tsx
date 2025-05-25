import { useIntl } from 'react-intl';

import { Button } from '@/app/components/ui/button';
import { Label } from '@/app/components/ui/label';
import { getConfig } from '@/app/config/config.config';
import { useWelcome } from '@/app/features/main/use-welcome';

export function Welcome() {
  const { formatMessage } = useIntl();
  const config = getConfig();
  const { onClickSignOut, onValueChangeLocale, currentLocale } = useWelcome();

  return (
    <div className="flex-1 flex flex-col items-center gap-2 min-h-0 p-4">
      <header className="flex flex-col items-center">
        <div>
          <img
            src={config.theme.logo}
            alt="React Router"
            className="block dark:hidden w-56 h-56"
          />
          <img
            src={config.theme.logo}
            alt="React Router"
            className="hidden w-full dark:block"
          />
        </div>
      </header>
      <div className="max-w-[300px] w-full">
        <nav className="rounded border border-gray-200 p-4 dark:border-gray-700 w-72">
          <p className="leading-6 text-gray-700 dark:text-gray-200 text-center font-bold">
            Messages i18n
          </p>
          <p className="leading-6 text-gray-700 dark:text-gray-200 text-center">
            {formatMessage({ id: 'app.welcome' })}
          </p>
          <p className="leading-6 text-gray-700 dark:text-gray-200 text-center">
            {formatMessage({ id: 'app.description' })}
          </p>
          <p className="leading-6 text-gray-700 dark:text-gray-200 text-center">
            {formatMessage({ id: 'app.items' }, { count: 5 })}
          </p>
          <p className="leading-6 text-gray-700 dark:text-gray-200 text-center">
            {formatMessage({ id: 'app.fallback-example' })}
          </p>
        </nav>
      </div>

      <div className="flex flex-col gap-2 border border-gray-200 p-4 rounded w-72">
        <p className="font-bold">
          {formatMessage({ id: 'app.language' })} ({currentLocale})
        </p>
        <div>
          <select
            value={currentLocale}
            onChange={(e) => onValueChangeLocale(e.target.value)}
            className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:text-white"
          >
            <option value="pt">Português</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2 border border-gray-200 p-4 rounded w-72">
        <p className="font-bold">{formatMessage({ id: 'app.sign-out' })}</p>
        <div className="flex flex-row items-center gap-4">
          <Button className="w-full" onClick={onClickSignOut}>
            {formatMessage({ id: 'app.sign-out' })}
          </Button>
        </div>
      </div>
    </div>
  );
}
