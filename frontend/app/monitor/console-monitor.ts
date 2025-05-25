import { monitorLogger } from './monitor-logger';

export function trackerConsole(): void {
  const originalLog = console.log;
  const originalError = console.error;
  const originalWarn = console.warn;

  console.log = (...args: any[]) => {
    track('[LOG]', args);
    originalLog.apply(console, args);
  };

  console.error = (...args: any[]) => {
    track('[ERROR]', args);
    originalError.apply(console, args);
  };

  console.warn = (...args: any[]) => {
    track('[WARN]', args);
    originalWarn.apply(console, args);
  };
}

function track(type: string, args: any[]): void {
  monitorLogger.app.console(type, args);
}
