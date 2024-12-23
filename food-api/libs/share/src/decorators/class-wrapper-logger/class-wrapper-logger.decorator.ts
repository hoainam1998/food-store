import { Logger } from '@nestjs/common';

export function WrapperWithLogger(constructor: any): void {
  constructor.prototype.logger = new Logger(constructor.name);
}
