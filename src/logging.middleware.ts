import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');
  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    res.on('finish', () => {
      const requestId = req.headers['x-request-id'];
      this.logger.log(
        `[${requestId}] ${method} ${originalUrl} ${res.statusCode}`,
      );
    });
    next();
  }
}
