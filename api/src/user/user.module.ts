import { Module, OnModuleInit } from '@nestjs/common';

// Custom Packages
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto';
import { config } from '../shared/configs/config';
import { RoleModule } from 'src/role/role.module';
import { RoleService } from 'src/role/role.service';

@Module({
	imports: [RoleModule],
	controllers: [UserController],
	providers: [UserService],
	exports: [UserService],
})
export class UserModule implements OnModuleInit {
	constructor(
		private readonly userService: UserService,
		private readonly roleService: RoleService,
	) {}
	public async onModuleInit(): Promise<void> {
		if ((await this.userService.findAll()).length === 0) {
			this.userService.createUser(
				{
					firstname: config.get('admin.firstname'),
					lastname: config.get('admin.lastname'),
					mail: config.get('admin.mail'),
					password: config.get('admin.password'),
				} as CreateUserDto,
				['Admin'],
			);
		}
	}
}
