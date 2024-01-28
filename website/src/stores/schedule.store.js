import { defineStore } from 'pinia';
import { $axios } from '@/config/axios';

export const useScheduleStore = defineStore('schedule', {
	state: () => {
		return { user: null };
	},
	actions: {
		async getSchedule() {
			try {
				// Send the GET request
				const response = await $axios.get('/schedule');
				return response.data;
			} catch (error) {
				throw new Error('Error reading user: ' + error.message);
			}
		},

		async reloadSchedule() {
			try {
				// Send the refresh request
				await $axios.post('/schedule');
			} catch (error) {
				throw new Error('Error reading user: ' + error.message);
			}
		},

		async convertScheduleToEvents() {
			try {
				const events = [];

				const schedule = await this.getSchedule();

				// Parcourez chaque élément de la liste schedule
				for (const item of schedule) {
					const start = new Date(item.Date); // Convertir la date en objet Date

					// Calculer la fin comme 2 heures après le début
					const end = new Date(start);
					end.setHours(start.getHours() + 2);

					// Créer l'événement au format FullCalendar
					const event = {
						id: -1,
						groupId: 'Match',
						title: `${item['Équipe 1']} - ${item['Équipe 2']}`,
						start: start.toISOString(), // Convertir en format ISO8601
						end: end.toISOString(),
					};

					events.push(event); // Ajouter l'événement à la liste des événements
				}

				return events;
			} catch (error) {
				throw new Error(
					'Error converting schedule to events: ' + error.message
				);
			}
		},
	},
});
