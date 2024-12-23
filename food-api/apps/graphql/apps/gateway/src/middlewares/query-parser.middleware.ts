import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class QueryParserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.body.queries) {
      req.body.queries = req.body.queries.join(',').replace(/,/, ',\n');
    }
    next();
  }
}
