import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Observable, tap } from 'rxjs';

@Injectable()
export class ValidationControllerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap({
        error(err) {
          if (
            err instanceof PrismaClientKnownRequestError &&
            err.code === 'P2025'
          ) {
            throw new BadRequestException(err.meta.cause);
          }
          throw new BadRequestException(err.message);
        },
      }),
    );
  }
}
