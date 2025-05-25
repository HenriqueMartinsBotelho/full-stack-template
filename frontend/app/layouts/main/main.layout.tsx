import { Outlet } from 'react-router-dom';

import { Separator } from '@/app/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/app/components/ui/sidebar';
import { AppBreadcrumbs } from '@/app/layouts/main/components/app-breadcumbs';
import { AppSidebar } from '@/app/layouts/main/components/app-sidebar';

export function MainLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 bg-sky-600 text-white">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <AppBreadcrumbs />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 bg-slate-50">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
