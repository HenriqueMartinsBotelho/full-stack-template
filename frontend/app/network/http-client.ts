import axios, { type AxiosInstance } from 'axios';

import setupInterceptor from '@/app/network/http-inteceptor';
import { getConfig } from '@/app/config/config.config';

export default function HttpClient(): AxiosInstance {
  const config = getConfig();

  const baseUrl = import.meta.env.DEV
    ? `/proxy/${config.name}/api` // use vite proxy for dev ex: /proxy/td/api
    : config.apiUrl;

  const httpClient = axios.create({
    baseURL: baseUrl,
    timeout: 10000,
  });

  setupInterceptor(httpClient);

  return httpClient;
}
