// Custom Packages
import { CreateRoleDto } from './dto/create-role.dto';
import { Permissions } from './class/permissions';

export class Role {
	constructor(roleId: number, dto: CreateRoleDto) {
		this.roleId = roleId;
		this.title = dto.title;
		this.permissions = dto.permissions;
		this.color = dto.color;
	}

	roleId!: number;

	//TODO: hiérarchie des rôles pour RBAC, admin on top

	// Propriété UNIQUE, pas 2 rôles avec un même nom
	title!: string;

	permissions!: Permissions;

	color!: string;
}
