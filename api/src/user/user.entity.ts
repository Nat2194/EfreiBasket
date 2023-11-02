import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto';
import { Role } from 'src/role/role.entity';

export class User {
	userId: number;
	firstname: string;
	lastname: string;
	mail: string;
	password: string;
	roles: Role[];
	lastLogin?: number;

	constructor(userId: number, dto: CreateUserDto, roles: Role[]) {
		this.userId = userId;
		this.firstname = dto.firstname;
		this.lastname = dto.lastname;
		this.mail = dto.mail;
		this.password = dto.password;
		this.roles = roles;
	}

	async comparePassword(password: string): Promise<boolean> {
		return bcrypt.compare(password, this.password);
	}

	public async setPassword(password: string): Promise<void> {
		this.password = await bcrypt.hash(password, 10);
	}
}
