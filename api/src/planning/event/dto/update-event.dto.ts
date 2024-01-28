import {
	IsString,
	IsNotEmpty,
	MaxLength,
	IsDate,
	IsOptional,
} from 'class-validator';

export class UpdateEventDto {
	@IsString()
	@IsNotEmpty()
	@MaxLength(50)
	@IsOptional()
	readonly groupId: string;

	@IsString()
	@IsNotEmpty()
	@MaxLength(50)
	@IsOptional()
	readonly title: string;

	@IsDate()
	@IsNotEmpty()
	@IsOptional()
	start: Date;

	@IsDate()
	@IsNotEmpty()
	@IsOptional()
	end: Date;
}
