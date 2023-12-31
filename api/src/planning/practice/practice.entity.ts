import { CreatePracticeDto } from './dto';

export class Practice {
	constructor(dto: CreatePracticeDto) {
		this.groupId = dto.groupId;
		this.title = dto.title;
		this.start = new Date(dto.start);
		this.end = new Date(dto.end);
	}
	groupId!: string;
	title!: string;
	start!: Date;
	end!: Date;
}
