import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import {
  toStateError,
  toStateLoading,
  toStateNone,
  toStateSuccess,
  type ViewState,
} from '@/app/common/states/view-state';
import { useAuth } from '@/app/hooks/use-auth';
import {
  getBrowserName,
  getBrowserVersion,
  getOSName,
} from '@/app/lib/browser';
import { BadRequestError } from '@/app/network/errors';
import type { Device } from '@/app/common/models';
import type { SingInResponse } from '@/app/common/response';
import {
  type SignInData,
  signInSchema,
} from '@/app/features/entrance/sign-in/sign-in.schema';
import { AuthService } from '@/app/services';

export function useSignIn() {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
  });

  const [viewState, setViewState] = useState<ViewState>(toStateNone());

  async function onSubmit(data: SignInData) {
    try {
      setViewState({
        type: 'loading',
      });
      const device = getDevice();

      const result: SingInResponse = await AuthService.authenticate(
        data.email,
        data.password
      );

      if (result.sign_in_response?.token) {
        signIn(result.sign_in_response.token);
      }

      setViewState(toStateSuccess(result));
      toast.success('Sign in successfully');
      reset();

      navigate('/', { replace: true });
    } catch (e) {
      if (e instanceof BadRequestError) {
        toast.error(e.message);
      }
      console.error(e);
      setViewState(toStateError());
    }
  }

  function getDevice(): Device {
    const ua = navigator.userAgent;

    const name = getBrowserName(ua);
    const version = getBrowserVersion(ua);
    const system = getOSName(ua);

    return {
      name,
      model: 'Web',
      system,
      version,
    };
  }

  return {
    viewState,
    register,
    onSubmit: handleSubmit(onSubmit),
    errors,
  };
}
