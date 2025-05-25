export type ViewState<T = any> =
  | { type: 'none' }
  | { type: 'loading' }
  | { type: 'success'; data?: T }
  | { type: 'error'; error?: any; errorMessage?: string };

export function toStateNone(): ViewState {
  return { type: 'none' };
}

export function toStateLoading(): ViewState {
  return { type: 'loading' };
}

export function toStateSuccess<T = any>(data?: T): ViewState<T> {
  return { type: 'success', data };
}

export function toStateError(error?: any, errorMessage?: string): ViewState {
  return { type: 'error', errorMessage, error };
}
