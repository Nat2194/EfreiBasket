import { Controller, Get } from '@nestjs/common';

// Custom imports
import { ScheduleService } from './schedule.service';
import { Schedule } from '../types/schedule.interface';

@Controller('schedule')
export class ScheduleController {
	constructor(private readonly scheduleService: ScheduleService) {}

	@Get()
	getSchedule(): Promise<Schedule> {
		console.log('received request');
		return this.scheduleService.getSchedule();
	}
}
