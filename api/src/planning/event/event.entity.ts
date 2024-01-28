import { CreateEventDto } from './dto';

export class Event {
	constructor(dto: CreateEventDto) {
		this.id = -1;
		this.groupId = dto.groupId;
		this.title = dto.title;
		this.start = new Date(dto.start);
		this.end = new Date(dto.end);
	}
	id!: number;
	groupId!: string;
	title!: string;
	start!: Date;
	end!: Date;
}
