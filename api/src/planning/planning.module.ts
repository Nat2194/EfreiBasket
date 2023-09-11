import { Module } from '@nestjs/common';

// Custom imports
import { PlanningController } from './planning.controller';
import { PlanningService } from './planning.service';

@Module({
	imports: [],
	controllers: [PlanningController],
	providers: [PlanningService],
})
export class PlanningModule {}
