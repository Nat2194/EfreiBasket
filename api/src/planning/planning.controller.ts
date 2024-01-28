import {
	Controller,
	Get,
	ParseIntPipe,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	HttpStatus,
} from '@nestjs/common';

// Custom imports
import { Planning } from '../types/planning.interface';
import { PlanningService } from './planning.service';
import { Event } from './event/event.entity';
import { Auth } from 'src/auth/auth.decorator';
import { CreateEventDto, UpdateEventDto } from './event/dto';

@Controller('planning')
export class PlanningController {
	constructor(private readonly planningService: PlanningService) {}

	@Get()
	getPlanning(): Promise<Planning> {
		return this.planningService.getPlanning();
	}

	@Auth()
	@Get('event/:id')
	find(@Param('id', ParseIntPipe) id: number): Promise<Event | null> {
		return this.planningService.getEventbyId(id);
	}
	@Auth()
	@Post('event')
	create(@Body() event: CreateEventDto): Promise<Event> {
		return this.planningService.createEvent(event);
	}
	@Auth()
	@Patch('event/:id')
	update(
		@Param('id', ParseIntPipe) id: number,
		@Body() event: UpdateEventDto,
	): Promise<Event> {
		return this.planningService.updateEvent(id, event);
	}

	@Auth()
	@Delete('event/:id')
	delete(@Param('id', ParseIntPipe) id: number): Promise<HttpStatus> {
		console.log('test');
		return this.planningService.deleteEvent(id);
	}
}
