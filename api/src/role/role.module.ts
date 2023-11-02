import { Module, OnModuleInit } from '@nestjs/common';

// Custom Packages
import { RoleController } from './role.controller';
import { Role } from './role.entity';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto';
import { ACTIONS } from 'src/shared/enum/Actions';

@Module({
	controllers: [RoleController],
	providers: [RoleService],
	exports: [RoleService],
})
export class RoleModule implements OnModuleInit {
	constructor(private readonly roleService: RoleService) {}
	public async onModuleInit(): Promise<void> {
		if ((await this.roleService.find('')).length === 0) {
			const adminRole = new Role(0, {
				title: 'Admin',
				color: 'red',
				permissions: {
					photo: [
						ACTIONS.CREATE,
						ACTIONS.READ,
						ACTIONS.UPDATE,
						ACTIONS.DELETE,
					],
					planning: [
						ACTIONS.CREATE,
						ACTIONS.READ,
						ACTIONS.UPDATE,
						ACTIONS.DELETE,
					],
					role: [
						ACTIONS.CREATE,
						ACTIONS.READ,
						ACTIONS.UPDATE,
						ACTIONS.DELETE,
					],
					self: [
						ACTIONS.CREATE,
						ACTIONS.READ,
						ACTIONS.UPDATE,
						ACTIONS.DELETE,
					],
					user: [
						ACTIONS.CREATE,
						ACTIONS.READ,
						ACTIONS.UPDATE,
						ACTIONS.DELETE,
					],
				},
			} as CreateRoleDto);
			await this.roleService.createRole(adminRole);

			const defaultRole = new Role(1, {
				title: 'Default',
				color: 'grey',
				permissions: {
					photo: [ACTIONS.READ],
					planning: [ACTIONS.READ],
					role: [ACTIONS.READ],
					self: [ACTIONS.READ],
					user: [ACTIONS.READ],
				},
			} as CreateRoleDto);
			await this.roleService.createRole(defaultRole);
		}
	}
}
