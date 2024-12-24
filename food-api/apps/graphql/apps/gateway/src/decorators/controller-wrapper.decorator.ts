import { messageCreator } from '@share/utils';
import { catchError, Observable } from 'rxjs';

export const ControllerWrapper: MethodDecorator = (
  target: object,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<any>,
) => {
  const originMethod = descriptor.value;
  descriptor.value = function (...args): Observable<any> {
    this.logger?.log('Calling to category graphql service!');

    return originMethod.call(this, ...args).pipe(
      catchError(async (error) => {
        this.logger?.debug(JSON.stringify(error.response.data));
        this.logger?.error(
          `Request to category graphql failed with: ${error.message}`,
        );
        return messageCreator(
          `Request to category graphql failed with: ${error.message}`,
        );
      }),
    );
  };
  return descriptor;
};
