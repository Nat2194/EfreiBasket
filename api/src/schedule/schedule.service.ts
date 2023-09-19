import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import { readFile } from 'fs/promises';

// Custom imports
import { Schedule } from '../types/schedule.interface';

@Injectable()
export class ScheduleService {
	async getSchedule(): Promise<Schedule> {
		try {
			// Exécuter le script Python "scraper.py"
			// await this.executePythonScript('scraper.py');

			// Exécuter le script Python "schedule_merge.py"
			// await this.executePythonScript('schedule_merge.py');

			// Lire le fichier JSON résultant
			const jsonData = await readFile(
				'./src/data/schedule.json',
				'utf-8',
			);

			// Parser le JSON en tant qu'objet JavaScript
			const scheduleData = JSON.parse(jsonData);

			return scheduleData;
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
