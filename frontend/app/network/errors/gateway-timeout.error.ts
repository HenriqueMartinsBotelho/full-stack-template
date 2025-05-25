export class GatewayTimeoutError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GatewayTimeoutError';
  }
}
