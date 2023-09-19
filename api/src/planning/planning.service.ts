import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import { readFile } from 'fs/promises';

// Custom imports
import { Planning } from '../types/planning.interface';

@Injectable()
export class PlanningService {
	async getPlanning(): Promise<Planning> {
		try {
			const practiceJson = await readFile(
				'./src/data/planning_practices.json',
				'utf-8',
			);
			const practiceData = JSON.parse(practiceJson);

			/*const gameJson = await readFile(
				'./src/data/planning_games.json',
				'utf-8',
			);
			const gameData = JSON.parse(gameJson);*/

			return practiceData;
		} catch (error) {
			throw new Error(`Une erreur est survenue : ${error.message}`);
		}
	}

	private executePythonScript(scriptName: string): Promise<void> {
		return new Promise((resolve, reject) => {
			exec(`python ./src/python/${scriptName}`, (error) => {
				if (error) {
					reject(error);
				} else {
					resolve();
				}
			});
		});
	}
}
