import { defineStore } from 'pinia';
import { $axios } from '../utils/axios';

export const useUsersStore = defineStore('users', {
	state: () => ({
		user: null,
	}),
	actions: {
		async login(loginData) {
			return await $axios
				.post('/users/login', loginData)
				.then((response) => {
					this.user = response.data;
					return response;
				})
				.catch((err) => {
					return err.response;
				});
		},
		async register(user) {
			const req = await $axios.post('/users', user).catch((err) => {
				return err.response;
			});
			return req;
		},
	},
});
