import {
	Body,
	Controller,
	Post,
	Get,
	Patch,
	Delete,
	Query,
} from '@nestjs/common';

//Custom Packages
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto';
import { UpdateRoleDto } from './dto';
import { Role } from './role.entity';
import { Auth } from 'src/auth/auth.decorator';

@Controller('role')
export class RoleController {
	constructor(private roleService: RoleService) {}

	@Auth()
	@Post()
	create(@Body() role: CreateRoleDto): Promise<Role> {
		return this.roleService.createRole(role);
	}

	@Auth()
	@Get()
	find(@Query('name') name: string): Promise<Role[]> {
		return this.roleService.find(name);
	}

	@Auth()
	@Patch()
	update(@Body() dto: UpdateRoleDto): Promise<Role> {
		return this.roleService.update(dto);
	}

	@Auth()
	@Delete()
	delete(@Body('name') name: string): Promise<boolean> {
		return this.roleService.delete(name);
	}
}
