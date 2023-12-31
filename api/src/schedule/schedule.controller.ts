import { Controller, Get, Post } from '@nestjs/common';

// Custom imports
import { ScheduleService } from './schedule.service';
import { Schedule } from '../types/schedule.interface';

@Controller('schedule')
export class ScheduleController {
	constructor(private readonly scheduleService: ScheduleService) {}

	@Get()
	getSchedule(): Promise<Schedule> {
		return this.scheduleService.getSchedule();
	}

	@Post()
	reloadSchedule(): Promise<void> {
		return this.scheduleService.reloadSchedule();
	}
}
