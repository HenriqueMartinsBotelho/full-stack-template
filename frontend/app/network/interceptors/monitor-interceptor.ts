import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import { monitorLogger } from '@/app/monitor/monitor-logger';

export const monitorRequestInterceptor = (config: AxiosRequestConfig) => {
  monitorLogger.http.request(
    config.method ?? 'UNKNOWN',
    config.url ?? '',
    config.headers
  );
  return config;
};

export const monitorResponseInterceptor = (response: AxiosResponse) => {
  monitorLogger.http.response(
    response.config.method ?? 'UNKNOWN',
    response.status,
    response.config.url ?? '',
    response.data
  );
  return response;
};

export const monitorErrorInterceptor = (error: AxiosError) => {
  if (error.config) {
    monitorLogger.http.response(
      error.config.method ?? 'ERROR',
      error.status || 0,
      error.config.url ?? '',
      error.response?.data || null
    );
  }
  return Promise.reject(error);
};
