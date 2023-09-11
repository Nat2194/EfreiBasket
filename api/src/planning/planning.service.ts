import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import { readFile } from 'fs/promises';

// Custom imports
import { Planning } from '../types/planning.interface';

@Injectable()
export class PlanningService {
	async getPlanning(): Promise<Planning> {
		try {
			// Exécuter le script Python "scraper.py"
			// await this.executePythonScript('scraper.py');

			// Exécuter le script Python "planning.py"
			// await this.executePythonScript('planning_merge.py');

			// Lire le fichier JSON résultant
			const jsonData = await readFile(
				'./src/data/planning.json',
				'utf-8',
			);

			// Parser le JSON en tant qu'objet JavaScript
			const planningData = JSON.parse(jsonData);

			return planningData;
		} catch (error) {
			throw new Error(`Une erreur est survenue : ${error.message}`);
		}
	}

	private executePythonScript(scriptName: string): Promise<void> {
		return new Promise((resolve, reject) => {
			exec(
				`python ./src/python/${scriptName}`,
				(error, stdout, stderr) => {
					if (error) {
						reject(error);
					} else {
						resolve();
					}
				},
			);
		});
	}
}
