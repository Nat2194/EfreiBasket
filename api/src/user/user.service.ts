import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as crypto from 'crypto';
import { CreateUserDto, UpdateUserDto } from './dto';
import { User } from './user.entity';
import { RoleService } from '../role/role.service';

@Injectable()
export class UserService {
	constructor(private readonly roleService: RoleService) {}
	private readonly filePath: string = './src/data/users.json';
	private readonly encryptionKey = Buffer.from(
		'442a05fb22e2165c45cae4fca94318e6f2cd99e9a8d3d1a36da9a2115cee2805',
		'hex',
	);
	private readonly iv = crypto.randomBytes(16); // Generate a random IV (Initialization Vector)

	async readFile(): Promise<User[]> {
		if (!fs.existsSync(this.filePath)) {
			// If the file doesn't exist, create it and return an empty array
			this.writeFile([]);
			return [];
		}
		try {
			const encryptedFile = fs.readFileSync(this.filePath);

			// Extract IV from the beginning of the file using Uint8Array.slice()
			const iv = Uint8Array.from(encryptedFile).slice(0, 16);
			const encryptedData = Uint8Array.from(encryptedFile).slice(16);

			const decipher = crypto.createDecipheriv(
				'aes-256-cbc',
				this.encryptionKey,
				Buffer.from(iv),
			);

			// Decrypt the data and convert it to a Buffer
			const decryptedData = Buffer.concat([
				Buffer.from(decipher.update(encryptedData)),
				Buffer.from(decipher.final()),
			]);

			const decryptedJson = decryptedData.toString('utf8');
			const userData: User[] = JSON.parse(decryptedJson);

			return userData;
		} catch (error) {
			throw error;
		}
	}

	private async writeFile(data: User[]): Promise<void> {
		const encryptedData = JSON.stringify(data);

		const cipher = crypto.createCipheriv(
			'aes-256-cbc',
			this.encryptionKey,
			this.iv,
		);

		const encrypted = Buffer.concat([
			cipher.update(encryptedData, 'utf8'),
			cipher.final(),
		]);
		const encryptedFile = Buffer.concat([this.iv, encrypted]); // Concatenate IV and encrypted data

		try {
			fs.writeFileSync(this.filePath, encryptedFile);
		} catch (error) {
			//console.error('Error writing file:', error);
		}
	}

	public async createUser(
		dto: CreateUserDto,
		roles: string[],
	): Promise<User> {
		const users = await this.readFile();
		if (users.some((user) => user.mail === dto.mail)) {
			return null;
		}
		const rolesToAssign = [];
		for (const role in roles) {
			rolesToAssign.push(await this.roleService.find(role)[0]);
		}

		const newUser = new User(
			Math.max(...users.map((user) => user.userId), 0) + 1,
			dto,
			rolesToAssign,
		);

		await newUser.setPassword(dto.password);
		users.push(newUser);
		await this.writeFile(users);
		return newUser;
	}

	public async findAll(): Promise<User[]> {
		return this.readFile();
	}

	public async findOne(mail: string): Promise<User> {
		const users = await this.readFile();
		const userData = users.find((u) => u.mail === mail);
		if (!userData) {
			return null;
		}
		const user = new User(
			userData.userId,
			{
				firstname: userData.firstname,
				lastname: userData.lastname,
				mail: userData.mail,
				password: userData.password,
			},
			userData.roles,
		);
		user.lastLogin = userData.lastLogin;
		return user;
	}

	public async findUsers(searchData: Partial<User>): Promise<User[]> {
		const users = await this.readFile();

		// Filtrer les utilisateurs en fonction des critères de recherche
		const filteredUsers = users.filter((user) => {
			if (searchData.mail !== '' && user.mail !== searchData.mail) {
				return false;
			}
			if (
				searchData.lastname !== '' &&
				user.lastname !== searchData.lastname
			) {
				return false;
			}
			if (
				searchData.firstname !== '' &&
				user.firstname !== searchData.firstname
			) {
				return false;
			}
			return true;
		});

		return filteredUsers;
	}

	public async update(dto: UpdateUserDto): Promise<User> {
		const users = await this.readFile();
		const index = users.findIndex((u) => u.mail === dto.mail);
		if (index === -1) {
			return null;
		}

		// Mettre à jour uniquement les attributs définis dans dto
		if (dto.password !== undefined) {
			await users[index].setPassword(dto.password);
		}

		if (dto.lastname !== undefined) {
			users[index].lastname = dto.lastname;
		}

		if (dto.firstname !== undefined) {
			users[index].firstname = dto.firstname;
		}

		if (dto.lastLogin !== undefined) {
			users[index].lastLogin = dto.lastLogin;
		}

		// Ajoutez d'autres attributs ici selon les besoins

		await this.writeFile(users);
		return users[index];
	}

	public async delete(user: Partial<User>): Promise<boolean> {
		const users = await this.readFile();
		const index = users.findIndex((u) => u.mail === user.mail);
		if (index === -1) {
			return false;
		}
		users.splice(index, 1);
		await this.writeFile(users);
		return true;
	}
}
