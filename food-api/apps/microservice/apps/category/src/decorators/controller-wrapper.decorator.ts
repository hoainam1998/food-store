import { BadRequestException } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { catchError, map, Observable } from 'rxjs';

export const ControllerWrapper: MethodDecorator = (
  target: object,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<any>,
) => {
  const originMethod = descriptor.value;
  descriptor.value = function (...args): Observable<any> {
    try {
      this.logger?.log('Calling category microservice service!');

      return originMethod.call(this, ...args).pipe(
        map((response: AxiosResponse<any>) => response.data),
        catchError(async (err) => {
          this.logger?.error(
            `Send request to graphql gateway failed width: ${err.message}`,
          );
          return new BadRequestException(
            `Send request to graphql gateway failed width: ${err.message}`,
          ).getResponse();
        }),
      );
    } catch (error) {
      this.logger?.error(error.message);
      throw new BadRequestException(error.message);
    }
  };
  return descriptor;
};
