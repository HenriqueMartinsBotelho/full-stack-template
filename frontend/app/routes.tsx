import type { Breadcrumb } from '@/app/common/models/breadcrumb';
import ErrorBoundarySystem from '@/app/components/system/error-boundary.system';
import { AdminPage } from '@/app/features/admin/admin-page';
import { PrivateLayout, PublicLayout } from '@/app/layouts';
import { NotFound } from '@/app/not-found';
import { Unauthorized } from '@/app/unauthorized';
import {
  ForgotPasswordPage,
  SignInPage,
  SignUpPage,
} from '@/app/features/entrance';
import { EntranceLayout } from '@/app/features/entrance/entrance.layout';
import { Welcome } from '@/app/features/main/welcome';
import { RequireRoleLayout } from '@/app/layouts';
import { MainLayout } from '@/app/layouts/main/main.layout';
import { Page1 } from './features/page1/page1';
import { Page2 } from './features/page2/page2';
import { Page3 } from './features/page3/page3';

export default [
  {
    Component: PublicLayout,
    children: [
      {
        Component: EntranceLayout,
        children: [
          {
            path: 'sign-in',
            element: <SignInPage />,
          },
          {
            path: 'sign-up',
            element: <SignUpPage />,
          },
          {
            path: 'forgot-password',
            element: <ForgotPasswordPage />,
          },
        ],
      },
    ],
  },
  {
    Component: PrivateLayout,
    children: [
      {
        Component: MainLayout,
        children: [
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
          {
            index: true,
            handle: {
              title: 'Home',
            } satisfies Breadcrumb,
            element: <Welcome />,
          },
          {
            element: <RequireRoleLayout allowedRoles={['admin']} />,
            children: [
              {
                path: 'admin',
                handle: {
                  title: 'Admin Page',
                } satisfies Breadcrumb,
                element: <AdminPage />,
              },
            ],
          },
          {
            element: <RequireRoleLayout allowedRoles={['admin', 'user']} />,
            children: [
              {
                path: 'page1',
                handle: {
                  title: 'Page 1',
                } satisfies Breadcrumb,
                element: <Page1 />,
              },
            ],
          },
          {
            element: <RequireRoleLayout allowedRoles={['admin', 'user']} />,
            children: [
              {
                path: 'page2',
                handle: {
                  title: 'Page 2',
                } satisfies Breadcrumb,
                element: <Page2 />,
              },
            ],
          },
          {
            element: <RequireRoleLayout allowedRoles={['admin', 'user']} />,
            children: [
              {
                path: 'page3',
                handle: {
                  title: 'Page 3',
                } satisfies Breadcrumb,
                element: <Page3 />,
              },
            ],
          },
        ],
      },
    ],
  },
];
