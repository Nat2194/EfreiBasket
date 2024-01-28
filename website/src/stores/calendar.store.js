import { defineStore } from 'pinia';
import { $axios } from '@/config/axios';

export const useCalendarStore = defineStore('calendar', {
	state: () => {
		return { event: null };
	},
	actions: {
		async getPlanning() {
			try {
				// Send the GET request
				const response = await $axios.get('/planning');
				// Mettez à jour le résultat ou effectuez d'autres actions si nécessaire
				return response.data;
			} catch (error) {
				throw new Error('Error reading user: ' + error.message);
			}
		},

		async getEventbyId(id) {
			try {
				const response = await $axios.get(`/planning/event/${id}`, {
					requiresAuth: true,
				});
				return response.data;
			} catch (error) {
				throw new Error('Error reading user: ' + error.message);
			}
		},
		async createEvent(eventData) {
			delete eventData.id;
			// Envoyez la requête de création d'événement à l'API
			const response = await $axios.post('/planning/event', eventData, {
				requiresAuth: true,
			});
			// Mettez à jour le résultat ou effectuez d'autres actions si nécessaire
			return response.data;
		},
		async updateEvent(eventData) {
			const id = eventData.id;
			delete eventData.id;
			try {
				const response = await $axios.patch(
					`/planning/event/${id}`,
					eventData
				);
				return response.data;
			} catch (error) {
				console.error('Error updating event:', error);
				throw error;
			}
		},
		async deleteEvent(id) {
			try {
				return await $axios.delete(`/planning/event/${id}`);
			} catch (error) {
				console.error('Error deleting event:', error);
				throw error;
			}
		},
	},
});
