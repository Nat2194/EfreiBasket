//Custom Packages
import { CreateRoleDto } from './dto';
import { UpdateRoleDto } from './dto';
import { Role } from './role.entity';
import * as fs from 'fs';
import * as crypto from 'crypto';

export class RoleService {
	private readonly filePath: string = './src/data/roles.json';
	private readonly encryptionKey = Buffer.from(
		'd8da67511bc49caa87241e4bbea5d117a67546e383bb75a69185be3aadc4a2aa',
		'hex',
	);
	private readonly iv = crypto.randomBytes(16); // Generate a random IV (Initialization Vector)

	async readFile(): Promise<Role[]> {
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
			const roleData: Role[] = JSON.parse(decryptedJson);

			return roleData;
		} catch (error) {
			throw error;
		}
	}

	private async writeFile(data: Role[]): Promise<void> {
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

	public async createRole(dto: CreateRoleDto): Promise<Role> {
		const roles = await this.readFile();
		if (roles.some((role) => role.title === dto.title)) {
			throw new Error('A role with this name already exists');
		}
		const newRole = new Role(
			Math.max(...roles.map((role) => role.roleId), 0) + 1,
			dto,
		);
		roles.push(newRole);
		await this.writeFile(roles);
		return newRole;
	}

	public async find(name: string): Promise<Role[]> {
		console.log(name);
		const roles = await this.readFile();
		if (!name) {
			return roles;
		}
		console.log(roles.filter((role) => name === role.title));
		return roles.filter((role) => name === role.title);
	}
	public async findAll(): Promise<Role[]> {
		return this.readFile();
	}

	public async update(dto: UpdateRoleDto): Promise<Role> {
		const roles = await this.readFile();
		const index = roles.findIndex((r) => r.title === dto.title);
		if (index === -1) {
			return null;
		}
		// Mettre à jour uniquement les attributs définis dans dto

		// Change le nom du rôle à condition que le nouveau nom ne soit pas déjà utilisé
		if (
			dto.title !== undefined &&
			!roles.some((role) => role.title === dto.title)
		) {
			roles[index].title = dto.title;
		}

		//TODO: vérification des permissions nécessaires
		if (dto.permissions !== undefined) {
			roles[index].permissions = dto.permissions;
		}

		if (dto.color !== undefined) {
			roles[index].color = dto.color;
		}

		// Ajoutez d'autres attributs ici selon les besoins

		await this.writeFile(roles);
		return roles[index];
	}

	public async delete(name: string): Promise<boolean> {
		console.log(name);
		const roles = await this.readFile();
		const index = roles.findIndex((r) => r.title === name);
		console.log(index);
		if (index === -1) {
			return false;
		}
		roles.splice(index, 1);
		await this.writeFile(roles);
		return true;
	}
}
