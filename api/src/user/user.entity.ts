import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto';

export class User {
	userId: number;
	firstname: string;
	lastname: string;
	mail: string;
	password: string;
	lastLogin?: number;

	constructor(userId: number, dto: CreateUserDto) {
		this.userId = userId;
		this.firstname = dto.firstname;
		this.lastname = dto.lastname;
		this.mail = dto.mail;
		this.password = dto.password;
	}

	async comparePassword(password: string): Promise<boolean> {
		return bcrypt.compare(password, this.password);
	}

	public async setPassword(password: string): Promise<void> {
		this.password = await bcrypt.hash(password, 10);
	}
}
