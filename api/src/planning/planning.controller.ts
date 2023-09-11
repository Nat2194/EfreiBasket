import { Controller, Get } from '@nestjs/common';

// Custom imports
import { Planning } from '../types/planning.interface';
import { PlanningService } from './planning.service';

@Controller('schedule')
export class PlanningController {
	constructor(private readonly planningService: PlanningService) {}

	@Get()
	getPlanning(): Promise<Planning> {
		return this.planningService.getPlanning();
	}
}
