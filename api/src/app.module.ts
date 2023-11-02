import { ScheduleModule } from './schedule/schedule.module';
import { Module } from '@nestjs/common';
import { MiddlewareConsumer } from '@nestjs/common/interfaces/middleware/middleware-consumer.interface';

// Custom imports
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlanningModule } from './planning/planning.module';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { LoggingMiddleware } from './logging.middleware';

@Module({
	imports: [
		ScheduleModule,
		PlanningModule,
		RoleModule,
		UserModule,
		AuthModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggingMiddleware).forRoutes('*'); // Remplacez 'votre-endpoint' par le chemin de votre endpoint
	}
}
