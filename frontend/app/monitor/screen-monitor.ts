export const screenMonitor = (trackEvent: any) => {
  return {
    trackScreen: (screen: string, event: string, props?: any) => {
      trackEvent(screen, event, props);
    },
  };
};
