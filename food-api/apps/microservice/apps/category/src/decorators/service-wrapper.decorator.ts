import { Observable } from 'rxjs';

export const ServiceWrapper = (
  target: object,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<any>,
) => {
  const originMethod = descriptor.value;
  descriptor.value = function (...args): Observable<any> {
    this.logger.log('Calling to category graphql');
    return originMethod.call(this, ...args);
  };
  return descriptor;
};
