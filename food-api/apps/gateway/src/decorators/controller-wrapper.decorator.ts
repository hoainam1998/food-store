import { BadRequestException, HttpStatus } from '@nestjs/common';
import { map } from 'rxjs';

export const ControllerWrapper: MethodDecorator = (
  target: object,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<any>,
) => {
  const originMethod = descriptor.value;
  descriptor.value = function (...args) {
    try {
      this.logger?.log('Calling category service!');
      return originMethod.call(this, ...args).pipe(
        map((result: ReturnType<BadRequestException['getResponse']> | any) => {
          if (
            result.statusCode &&
            ![HttpStatus.OK, HttpStatus.CREATED].includes(result.statusCode)
          ) {
            throw new BadRequestException(result.message);
          }
          return result;
        }),
      );
    } catch (error) {
      this.logger?.error(error.message);
      throw new BadRequestException(error.message);
    }
  };
  return descriptor;
};
