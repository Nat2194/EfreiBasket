import {
	IsString,
	IsNotEmpty,
	IsEmail,
	MinLength,
	MaxLength,
} from 'class-validator';

export class CreateUserDto {
	@IsString()
	@IsNotEmpty()
	@MinLength(8)
	readonly password: string;

	@IsString()
	@IsNotEmpty()
	@IsEmail()
	readonly mail: string;

	@IsString()
	@IsNotEmpty()
	@MaxLength(50)
	readonly firstname: string;

	@IsString()
	@IsNotEmpty()
	@MaxLength(50)
	readonly lastname: string;
}
