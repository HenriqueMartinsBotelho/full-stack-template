export const appMonitor = (trackEvent: any) => {
  return {
    track: (type: string, message: any) => {
      trackEvent(`${type}`, {
        data: message,
      });
    },
    console: (type: string, message: any) => {
      trackEvent(`[CONSOLE] ${type}`, {
        data: message,
      });
    },
    errorHttp: (error: any) => {
      trackEvent('[ERROR_HTTP]', {
        error: error.message,
      });
    },
    errorType: (error: any) => {
      trackEvent('[ERROR_TYPE]', {
        error: error.message,
      });
    },
    errorGeneral: (error: any) => {
      trackEvent('[ERROR_GENERAL]', {
        error: error.message,
      });
    },
    errorUnknown: (error: any) => {
      trackEvent('[ERROR_UNKNOWN]', {
        error,
      });
    },
  };
};
