import { Injectable } from '@nestjs/common';
import { readFile } from 'fs/promises';
import * as fs from 'fs';

// Custom imports
import { Practice } from './practice/practice.entity';
import { Planning } from 'src/types/planning.interface';
import { CreatePracticeDto } from './practice/dto';
import { UpdatePracticeDto } from './practice/dto';

@Injectable()
export class PlanningService {
	private readonly dataFilePath = 'planning_practices.json';

	async getPlanning(): Promise<Planning> {
		try {
			// Lire le fichier JSON résultant
			const jsonData = await readFile(
				'./src/data/planning_practices.json',
				'utf-8',
			);

			// Parser le JSON en tant qu'objet JavaScript
			const planningData = JSON.parse(jsonData);

			return planningData;
		} catch (error) {
			throw new Error(`Une erreur est survenue : ${error.message}`);
		}
	}

	async getAllPractices(): Promise<Practice[]> {
		const practices = await this.readData();
		return practices;
	}

	async getPracticeById(id: number): Promise<Practice | null> {
		const practices = await this.readData();
		const practice = practices.find((p, index) => index === id);
		return practice || null;
	}

	async createPractice(
		createPracticeDto: CreatePracticeDto,
	): Promise<Practice> {
		const practices = await this.readData();
		const newPractice = new Practice(createPracticeDto);
		practices.push(newPractice);
		await this.writeData(practices);
		return newPractice;
	}

	async updatePractice(
		id: number,
		updatePracticeDto: UpdatePracticeDto,
	): Promise<Practice | null> {
		const practices = await this.readData();
		const practice = practices.find((p, index) => index === id);
		if (!practice) return null;

		practice.groupId = updatePracticeDto.groupId;
		practice.title = updatePracticeDto.title;
		practice.start = updatePracticeDto.start;
		practice.end = updatePracticeDto.end;

		await this.writeData(practices);
		return practice;
	}

	async deletePractice(id: number): Promise<Practice | null> {
		const practices = await this.readData();
		const practiceIndex = practices.findIndex((p, index) => index === id);

		if (practiceIndex === -1) return null;

		const [deletedPractice] = practices.splice(practiceIndex, 1);
		await this.writeData(practices);
		return deletedPractice;
	}

	private async readData(): Promise<Practice[]> {
		const data = fs.readFileSync(this.dataFilePath, 'utf8');
		return JSON.parse(data);
	}

	private async writeData(data: Practice[]): Promise<void> {
		fs.writeFileSync(this.dataFilePath, JSON.stringify(data, null, 2));
	}
}
