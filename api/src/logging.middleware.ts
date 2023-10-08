// logging.middleware.ts
import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
	private readonly logger = new Logger('HTTP');

	use(req: Request, res: Response, next: NextFunction) {
		this.logger.log(`Received ${req.method} request at ${req.url}`);
		this.logger.log(`Request body: ${JSON.stringify(req.body)}`);
		next();
	}
}
