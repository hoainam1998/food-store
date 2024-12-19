import { Logger } from '@nestjs/common';
import { LoggerService } from './logger.service';

/**
 * Validate message, if it was existed then throw error.
 *
 * @param {LoggerService} itSelfClass - instance using this decorator.
 * @return {Function} success - decorator function.
 */
export function MessageValidate(self: typeof LoggerService) {
  return (
    target: object,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<any>,
  ) => {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      // first param alway is message;
      const message: string = args[0];
      // checking if message was showed, logging with error, else add it to list message showed and run origin method.
      if (self.messages.includes(message)) {
        Logger.error(`Duplicate message "${message}"`);
      } else {
        self.messages.push(message);
        originalMethod.apply(this, args);
      }
    };
    return descriptor;
  };
}
