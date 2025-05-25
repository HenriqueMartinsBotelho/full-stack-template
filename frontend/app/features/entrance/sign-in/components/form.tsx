import React from 'react';

import type { ViewState } from '@/app/common/states/view-state';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { LoadingSpinner } from '@/app/components/ui/loading-spinner';

interface FormProps {
  viewState: ViewState;
  register: any;
  errors: any;
}

export function Form({ viewState, register, errors }: FormProps) {
  return (
    <>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="m@example.com"
          {...register('email')}
        />
        {errors.email && (
          <span className={'p-1 border-2 border-rose-300 rounded text-sm    '}>
            {errors?.email?.message}
          </span>
        )}
      </div>

      <div className="grid gap-2">
        <div className="flex items-center">
          <Label htmlFor="password">Password</Label>
          <a
            href="/forgot-password"
            className="ml-auto text-sm underline-offset-2 hover:underline"
          >
            Forgot your password?
          </a>
        </div>
        <Input id="password" type="password" {...register('password')} />
        {errors.password && (
          <span className={'p-1 border-2 border-rose-300 rounded text-sm    '}>
            {errors?.password?.message}
          </span>
        )}
      </div>

      <Button type="submit" className="w-full">
        Sign In
        {viewState.type === 'loading' && <LoadingSpinner />}
      </Button>
    </>
  );
}
