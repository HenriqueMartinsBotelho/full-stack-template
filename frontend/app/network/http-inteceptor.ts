import {
  responseErrorInterceptor,
  responseSuccessInterceptor,
} from './interceptors/response-interceptor';
import { tokenInterceptor } from './interceptors/token-interceptor';

import {
  monitorErrorInterceptor,
  monitorRequestInterceptor,
  monitorResponseInterceptor,
} from '@/app/network/interceptors/monitor-interceptor';

export default function setupInterceptor(httpClient: any) {
  httpClient.interceptors.request.use(
    tokenInterceptor as any,
    monitorRequestInterceptor,
    (error: any) => Promise.reject(error)
  );

  httpClient.interceptors.response.use(
    responseSuccessInterceptor,
    responseErrorInterceptor,
    monitorResponseInterceptor,
    monitorErrorInterceptor
  );
}
