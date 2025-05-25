export class UnavailableError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UnavailableError';
  }
}
