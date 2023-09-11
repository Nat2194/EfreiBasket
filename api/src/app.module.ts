import { Module } from '@nestjs/common';

// Custom imports
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlanningModule } from './planning/planning.module';

@Module({
	imports: [PlanningModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
