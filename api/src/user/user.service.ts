import {
	Injectable,
	NotFoundException,
	ConflictException,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
import { User } from './user.entity';
import * as fs from 'fs';
import * as crypto from 'crypto';

@Injectable()
export class UserService {
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
			console.log('creating file');
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
			console.error('Error reading and decrypting file:', error);
			throw error;
		}
	}

	private async writeFile(data: User[]): Promise<void> {
		const encryptedData = JSON.stringify(data);
		console.log('encrypting key: ', this.encryptionKey);
		console.log('encrypting IV: ', this.iv);

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
			console.error('Error writing file:', error);
		}
	}

	public async createUser(dto: CreateUserDto): Promise<User> {
		const users = await this.readFile();
		if (users.some((user) => user.mail === dto.mail)) {
			throw new ConflictException('Email already used');
		}
		const newUser = new User(
			Math.max(...users.map((user) => user.userId), 0) + 1,
			dto,
		);

		await newUser.setPassword(dto.password);
		users.push(newUser);
		await this.writeFile(users);
		return newUser;
	}

	public async findAll(): Promise<User[]> {
		return this.readFile();
	}

	public async findOne(userId: number): Promise<User> {
		const users = await this.readFile();
		const user = users.find((u) => u.userId === userId);
		if (!user) {
			throw new NotFoundException('User not found');
		}
		return user;
	}

	public async update(userId: number, dto: UpdateUserDto): Promise<User> {
		const users = await this.readFile();
		const index = users.findIndex((u) => u.userId === userId);
		if (index === -1) {
			throw new NotFoundException('User not found');
		}
		if (typeof dto.password !== 'undefined') {
			await users[index].setPassword(dto.password);
		}
		users[index] = {
			...users[index],
			...dto,
			comparePassword: users[index].comparePassword,
			setPassword: users[index].setPassword,
		};
		await this.writeFile(users);
		return users[index];
	}

	public async delete(userId: number): Promise<void> {
		const users = await this.readFile();
		const index = users.findIndex((u) => u.userId === userId);
		if (index === -1) {
			throw new NotFoundException('User not found');
		}
		users.splice(index, 1);
		await this.writeFile(users);
	}

	public async findByMail(mail: string): Promise<User | undefined> {
		const users = await this.readFile();
		console.log('users :' + users);
		const user = users.find((user) => user.mail === mail);
		console.log(mail);
		console.log(user);
		const userDto = {
			firstname: user.firstname,
			lastname: user.lastname,
			mail: user.mail,
			password: user.password,
		};
		const userObject = new User(user.userId, userDto);

		userObject.comparePassword = User.prototype.comparePassword;
		userObject.setPassword = User.prototype.setPassword;

		return userObject;
	}
}
