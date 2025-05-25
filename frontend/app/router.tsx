import { createBrowserRouter } from 'react-router-dom';

import ErrorBoundarySystem from './components/system/error-boundary.system';

import RootLayout from '@/app/layouts/root.layout';
import { NotFound } from '@/app/not-found';
import { getConfig } from '@/app/config/config.config';
import { Unauthorized } from '@/app/unauthorized';

const config = getConfig();

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    ErrorBoundary: ErrorBoundarySystem,
    children: config.routes,
  },
  {
    path: '*',
    Component: NotFound,
    ErrorBoundary: ErrorBoundarySystem,
  },
  {
    path: 'unauthorized',
    Component: Unauthorized,
    ErrorBoundary: ErrorBoundarySystem,
  },
]);
