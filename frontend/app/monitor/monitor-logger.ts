import * as amplitude from '@amplitude/analytics-browser';
import { Identify } from '@amplitude/analytics-browser';

import packageJson from '../../package.json';
import { appMonitor } from './app-monitor';
import { httpMonitor } from './http-monitor';
import { screenMonitor } from './screen-monitor';
import { socketMonitor } from './socket-monitor';

import { getConfig } from '@/app/config/config.config';

export const monitorLogger = (() => {
  const logEvent = (eventName: string, props?: any) => {
    if (props && typeof props === 'object') {
      amplitude.logEvent(eventName, props);
      showLog(eventName, props);
    } else {
      amplitude.logEvent(eventName);
      showLog(eventName);
    }
  };

  const showLog = (eventName: string, eventProps?: any) => {
    if (import.meta.env.DEV) {
      if (eventProps) {
        console.log(eventName, eventProps);
      } else {
        console.log(eventName);
      }
    }
  };

  const trackEventHttp = (
    method: string,
    status: number,
    url: string,
    props?: any
  ) => {
    logEvent(
      `[HTTP]${status ? `[${status}]` : `[${method?.toUpperCase()}]`} ${url}`,
      props
    );
  };

  const trackEventApp = (eventName: string, props?: any) => {
    logEvent(`[APP]${eventName}`, props);
  };

  const trackEventSocket = (eventName: string, props?: any) => {
    logEvent(`[SOCKET][${eventName}]`, props);
  };

  const trackEventScreen = (
    screenName: string,
    eventName: string,
    props?: any
  ) => {
    logEvent(`[SCREEN][${screenName}] ${eventName.toLowerCase()}`, props);
  };

  const init = () => {
    const config = getConfig();
    amplitude.init(config.amplitudeKey || '', {
      autocapture: false,
      appVersion: packageJson.version,
    });

    amplitude.setGroup('environment', import.meta.env.MODE);
    amplitude.setOptOut(false);
  };

  const identifyProfile = (
    profileId: string,
    email: string,
    cpf: string,
    gender: string,
    profileType: string
  ) => {
    const identify = new Identify();
    identify.set('id', profileId);
    identify.set('email', email);
    identify.set('cpf', cpf);
    identify.set('gender', gender);
    identify.set('profileType', profileType);
    amplitude.identify(identify);
    amplitude.setUserId(email);
  };

  const clearProfile = () => {
    amplitude.reset();
  };

  return {
    init,
    identifyProfile,
    clearProfile,
    socket: socketMonitor(trackEventSocket),
    http: httpMonitor(trackEventHttp),
    app: appMonitor(trackEventApp),
    screen: screenMonitor(trackEventScreen),
  };
})();
