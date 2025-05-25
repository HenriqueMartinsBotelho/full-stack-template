import type { AxiosError, AxiosResponse } from 'axios';

import { httpErrorResolver } from '@/app/network/http-error-resolver';

export const responseSuccessInterceptor = (response: AxiosResponse) => {
  return response;
};

export const responseErrorInterceptor = (error: AxiosError) => {
  return Promise.reject(httpErrorResolver(error));
};
