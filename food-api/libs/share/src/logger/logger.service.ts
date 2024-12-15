import { ConsoleLogger } from '@nestjs/common';
import { MessageValidate } from './message-validate.decorator';

export class LoggerService extends ConsoleLogger {
  static messages: string[] = [];

  constructor(context: string) {
    super(context);
  }

  @MessageValidate(LoggerService)
  log(message: string): void {
    super.log(message);
  }

  @MessageValidate(LoggerService)
  error(message: string): void {
    super.error(message);
  }

  @MessageValidate(LoggerService)
  warn(message: string): void {
    super.error(message);
  }

  @MessageValidate(LoggerService)
  debug(message: string): void {
    super.debug(message);
  }
}
