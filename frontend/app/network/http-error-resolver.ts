import { UnexpectedError } from '@/app/common/errors';
import {
  BadGatewayError,
  BadRequestError,
  ConflictError,
  GatewayTimeoutError,
  InternalServerErrorError,
  NotFoundError,
  RequestTimeoutError,
  ServiceUnavailableError,
  TooManyRequestsError,
  UnauthorizedError,
} from '@/app/network/errors';

export function httpErrorResolver(error: any, args?: any): Error {
  const url = error?.config?.url;
  const httpStatusCode = error?.status;
  const response = error?.response?.data;

  let exception: Error = new UnexpectedError(
    'Unexpected error occurred in http request'
  );

  if (url && httpStatusCode) {
    switch (httpStatusCode) {
      case 400:
        exception = new BadRequestError(response || 'BadRequestError');
        break;
      case 401:
        exception = new UnauthorizedError(response || 'UnauthorizedError');
        break;
      case 404:
        exception = new NotFoundError(response || 'NotFoundError');
        break;
      case 408:
        exception = new RequestTimeoutError(response || 'RequestTimeoutError');
        break;
      case 409:
        exception = new ConflictError(response || 'ConflictError');
        break;
      case 429:
        exception = new TooManyRequestsError(
          response || 'TooManyRequestsError'
        );
        break;
      case 500:
        exception = new InternalServerErrorError(
          response || 'InternalServerError'
        );
        break;
      case 502:
        exception = new BadGatewayError(response || 'BadGatewayError');
        break;
      case 503:
        exception = new ServiceUnavailableError(
          response || 'ServiceUnavailableError'
        );
        break;
      case 504:
        exception = new GatewayTimeoutError(response || 'GatewayTimeoutError');
        break;
    }
  }

  console.error({
    error: exception,
    response: response,
    args: args,
  });

  return exception;
}
