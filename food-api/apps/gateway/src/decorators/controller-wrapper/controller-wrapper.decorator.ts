import { BadRequestException } from '@nestjs/common';

export const ControllerWrapper: MethodDecorator = (
  target: object,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<any>,
) => {
  const originMethod = descriptor.value;
  descriptor.value = function (...args) {
    try {
      this.logger.log('Calling category service!');
      return originMethod.call(this, ...args);
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException(error.message);
    }
  };
  return descriptor;
};
