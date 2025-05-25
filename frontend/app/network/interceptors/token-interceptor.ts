import type { AxiosRequestConfig } from 'axios';

export const tokenInterceptor = (config: AxiosRequestConfig) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  return config;
};
