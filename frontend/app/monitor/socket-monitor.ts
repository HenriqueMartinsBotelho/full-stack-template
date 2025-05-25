export const socketMonitor = (trackEvent: any) => {
  return {
    trackStatus: (name: string, msg?: any) => {
      trackEvent(name, msg);
    },
    trackSend: (type: string, msg?: any) => {
      trackEvent(type, msg);
    },
    trackMessage: (msg: any) => {
      try {
        const data = JSON.parse(msg);
        trackEvent('DATA', data);
      } catch (e: any) {
        console.error(e);
        trackEvent(`ERROR`, e?.message || 'Track message error');
      }
    },
    trackError: (data: any) => {
      trackEvent(`ERROR`, JSON.stringify(data));
    },
  };
};
