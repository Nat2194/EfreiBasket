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
				// Mettez à jour le résultat ou effectuez d'autres actions si nécessaire
				return response.data;
			} catch (error) {
				throw new Error('Error reading user: ' + error.message);
			}
		},
	},
});
