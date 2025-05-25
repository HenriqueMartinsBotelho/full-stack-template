import type * as React from 'react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/app/components/ui/sidebar';
import { NavProjects } from '@/app/layouts/main/components/nav-projects';
import { NavUser } from '@/app/layouts/main/components/nav-user';
import { TeamSwitcher } from '@/app/layouts/main/components/team-switcher';
import { useSidebarData } from '@/app/hooks/use-sidebar-data';
import { Skeleton } from '@/app/components/ui/skeleton';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data, loading, error } = useSidebarData();

  if (loading) {
    return (
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
          <Skeleton className="h-8 w-full" />
        </SidebarHeader>
        <SidebarContent>
          <div className="space-y-2">
            <Skeleton className="h-6 w-full" />
          </div>
        </SidebarContent>
        <SidebarFooter>
          <Skeleton className="h-10 w-full" />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    );
  }

  if (error) {
    return <div>Error loading sidebar: {error.message}</div>;
  }

  if (!data) {
    return <div>No sidebar data available</div>;
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.categories} />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.items} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
