import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

export const ServiceWrapper: MethodDecorator = (
  target: object,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<any>,
) => {
  const originMethod = descriptor.value;
  descriptor.value = function (...args): Observable<AxiosResponse<any>> {
    this.logger.log('Requesting to category graphql service!');

    return originMethod.call(this, ...args);
  };
  return descriptor;
};
