import { HttpStatus, Injectable } from '@nestjs/common';
import { readFile } from 'fs/promises';
import * as fs from 'fs';

// Custom imports
import { Event } from './event/event.entity';
import { Planning } from 'src/types/planning.interface';
import { CreateEventDto } from './event/dto';
import { UpdateEventDto } from './event/dto';

@Injectable()
export class PlanningService {
	private readonly dataFilePath = 'events.json';

	async getPlanning(): Promise<Planning> {
		try {
			// Lire le fichier JSON résultant
			const jsonData = await readFile(
				'./src/data/' + this.dataFilePath,
				'utf-8',
			);

			// Parser le JSON en tant qu'objet JavaScript
			const planningData = JSON.parse(jsonData);

			return planningData;
		} catch (error) {
			throw new Error(`Une erreur est survenue : ${error.message}`);
		}
	}

	async getAllEvents(): Promise<Event[]> {
		const practices = await this.readData();
		return practices;
	}

	async getEventbyId(id: number): Promise<Event | null> {
		const events = await this.readData();
		const event = events.find((p) => p.id === id);
		return event || null;
	}

	async createEvent(createEventDto: CreateEventDto): Promise<Event> {
		const events = await this.readData();
		const newEvent = new Event(createEventDto);
		newEvent.id = await this.generateUniqueId();
		events.push(newEvent);
		await this.writeData(events);
		return newEvent;
	}

	async updateEvent(
		id: number,
		updateEventDto: UpdateEventDto,
	): Promise<Event | null> {
		const events = await this.readData();
		console.log(events);
		console.log(id);
		const event = events.find((p) => p.id === id);
		if (!event) {
			console.log('not found');
			return null;
		}

		event.groupId = updateEventDto.groupId;
		event.title = updateEventDto.title;
		event.start = updateEventDto.start;
		event.end = updateEventDto.end;

		console.log(event);

		console.log(events);

		await this.writeData(events);
		return event;
	}

	async deleteEvent(id: number): Promise<HttpStatus> {
		try {
			const events = await this.readData();
			const eventIndex = events.findIndex((p) => p.id === id);

			console.log(id);
			console.log(eventIndex);

			if (eventIndex === -1) return HttpStatus.NOT_FOUND;

			events.splice(eventIndex, 1);
			await this.writeData(events);
			return HttpStatus.NO_CONTENT; // Suppression réussie
		} catch (error) {
			return error;
		}
	}

	private async readData(): Promise<Event[]> {
		const data = fs.readFileSync('./src/data/' + this.dataFilePath, 'utf8');
		return JSON.parse(data);
	}

	private async writeData(data: Event[]): Promise<void> {
		fs.writeFileSync(
			'./src/data/' + this.dataFilePath,
			JSON.stringify(data, null, 2),
		);
	}

	private async generateUniqueId(): Promise<number> {
		// Trouver le plus grand ID existant
		const events = await this.readData();
		const existingIds = events.map((event) => event.id);
		const maxId = Math.max(...existingIds, 0);

		// Attribuer un nouvel ID unique
		return maxId + 1;
	}
}
