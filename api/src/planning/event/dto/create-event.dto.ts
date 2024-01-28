import { IsString, IsNotEmpty, MaxLength, IsDate } from 'class-validator';

export class CreateEventDto {
	@IsString()
	@IsNotEmpty()
	@MaxLength(50)
	readonly groupId: string;

	@IsString()
	@IsNotEmpty()
	@MaxLength(50)
	readonly title: string;

	@IsDate()
	@IsNotEmpty()
	start: Date;

	@IsDate()
	@IsNotEmpty()
	end: Date;
}
