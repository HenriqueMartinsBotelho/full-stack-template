import React from 'react';

import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';

export function ForgotPasswordPage() {
  return (
    <form className="p-6 md:p-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center text-center">
          <p className="text-balance text-muted-foreground">Forgot Password</p>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <Button type="submit" className="w-full">
          Send Reset Password
        </Button>
        <div className="text-center text-sm">
          Já possui uma conta?{' '}
          <a href="/sign-in" className="underline underline-offset-4">
            Sign in
          </a>
        </div>
      </div>
    </form>
  );
}
