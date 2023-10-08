import { ScheduleModule } from './schedule/schedule.module';
import { Module, RequestMethod } from '@nestjs/common';
import { MiddlewareConsumer } from '@nestjs/common/interfaces/middleware/middleware-consumer.interface';

// Custom imports
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlanningModule } from './planning/planning.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { LoggingMiddleware } from './logging.middleware';

@Module({
	imports: [ScheduleModule, PlanningModule, UserModule, AuthModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(LoggingMiddleware)
			.forRoutes({ path: '/user', method: RequestMethod.ALL }); // Remplacez 'votre-endpoint' par le chemin de votre endpoint
	}
}
