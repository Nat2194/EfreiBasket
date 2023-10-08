import {
	Body,
	Query,
	Controller,
	Post,
	Get,
	Param,
	ParseIntPipe,
	Patch,
	Delete,
} from '@nestjs/common';

// Custom imports
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { User } from './user.entity';
import { Auth } from 'src/auth/auth.decorator';

@Controller('user')
export class UserController {
	constructor(private userService: UserService) {}

	@Auth()
	@Post()
	create(@Body() user: CreateUserDto): Promise<User> {
		return this.userService.createUser(user);
	}

	@Auth()
	@Get() // Endpoint pour la recherche d'utilisateurs
	read(@Query() searchData: Partial<User>): Promise<User[]> {
		// Vérifiez si des critères de recherche sont spécifiés dans searchData
		const criteriaSpecified = Object.values(searchData).some(
			(value) => value !== '',
		);

		if (criteriaSpecified) {
			// Si des critères de recherche sont spécifiés, appelez la fonction de recherche avec ces critères
			return this.userService.findUsers(searchData);
		} else {
			// Si aucun critère de recherche n'est spécifié, renvoyez tous les utilisateurs disponibles
			return this.userService.findAll();
		}
	}

	@Auth()
	@Patch()
	update(@Body() dto: UpdateUserDto): Promise<User> {
		return this.userService.update(dto);
	}

	@Auth()
	@Delete()
	delete(@Body() user: Partial<User>): Promise<boolean> {
		return this.userService.delete(user);
	}
}
