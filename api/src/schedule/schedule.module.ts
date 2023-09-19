import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';

import { Module } from '@nestjs/common';

@Module({
	imports: [],
	controllers: [ScheduleController],
	providers: [ScheduleService],
})
export class ScheduleModule {}
