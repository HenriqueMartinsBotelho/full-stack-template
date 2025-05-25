import { Outlet, ScrollRestoration } from 'react-router-dom';
import { Toaster } from 'sonner';

import { monitorLogger } from '@/app/monitor/monitor-logger';
import { AuthProvider, LocaleProvider } from '@/app/providers';
import { ConfigProvider } from '@/app/config/config.provider';

export default function RootLayout() {
  monitorLogger.init();

  return (
    <ConfigProvider>
      <LocaleProvider>
        <AuthProvider>
          <div>
            <Outlet />
            <ScrollRestoration />
          </div>
          <Toaster />
        </AuthProvider>
      </LocaleProvider>
    </ConfigProvider>
  );
}
