import React from 'react';
import { Link, useMatches } from 'react-router-dom';

import type { Breadcrumb as Bread } from '@/app/common/models/breadcrumb';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/app/components/ui/breadcrumb';

export function AppBreadcrumbs() {
  const matches = useMatches();

  const breadcrumbs: Bread[] = matches
    .filter((match: any) => match.handle)
    .map((match: any) => {
      return {
        title: match.handle.title,
        path: match.pathname,
      };
    });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((breadcrumb, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <React.Fragment key={index}>
              <BreadcrumbItem className={index === 0 ? 'hidden md:block' : ''}>
                {isLast ? (
                  <BreadcrumbPage className="text-white">
                    {breadcrumb.title}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink
                    href={breadcrumb.path}
                    className="text-white cursor-pointer"
                  >
                    {breadcrumb.title}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>

              {!isLast && (
                <BreadcrumbSeparator className="hidden md:block text-white" />
              )}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
