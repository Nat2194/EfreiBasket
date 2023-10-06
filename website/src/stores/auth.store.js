import { defineStore } from 'pinia';
import { $axios } from '@/config/axios';
import * as dayjs from 'dayjs';
import cookie from 'cookie';

export const useAuthStore = defineStore('auth', {
	state: () => {
		return { user: null };
	},
	actions: {
		async login(mail, password) {
			try {
				const response = await $axios.post(
					'/auth/login',
					{ mail, password },
					{ requiresAuth: false }
				);
				this.user = response.data;
				return response;
			} catch (error) {
				return response;
			}
		},
		async refreshToken() {
			await $axios.post('/auth/refresh', {}, { requiresAuth: false });
		},
		async logout() {
			await $axios
				.post('/auth/logout', {}, { requiresAuth: false })
				.then(() => {
					this.user = null;
				});
		},
		async isLoggedIn() {
			const cookies = cookie.parse(document.cookie);
			const now = dayjs().unix();
			if (
				typeof cookies.accessTokenExpirationTime === 'undefined' ||
				typeof cookies.refreshTokenExpirationTime === 'undefined'
			) {
				return false;
			}

			if (parseInt(cookies.accessTokenExpirationTime) > now) {
				return true;
			}

			if (parseInt(cookies.refreshTokenExpirationTime) > now) {
				await this.refreshToken();
				return true;
			}

			return false;
		},
		async createUser(userData) {
			// Envoyez la requête de création d'utilisateur à l'API
			const response = await $axios.post('/user', userData, {
				requiresAuth: true,
			});
			// Mettez à jour le résultat ou effectuez d'autres actions si nécessaire
			return response.data;
		},

		async readUser(searchData) {
			try {
				// Envoyez la requête de lecture d'utilisateur à l'API avec les paramètres de recherche
				const response = await $axios.get('/user', {
					params: searchData,
					requiresAuth: true,
				});
				// Mettez à jour le résultat ou effectuez d'autres actions si nécessaire
				return response.data;
			} catch (error) {
				throw new Error('Error reading user: ' + error.message);
			}
		},

		async updateUser(dto) {
			try {
				const response = await $axios.patch('/user', dto, {
					requiresAuth: true, // Assurez-vous que cette requête nécessite une authentification si nécessaire
				});
				if (response.status === 404) {
					throw new Error('User not found');
				}
				return response.data;
			} catch (error) {
				throw new Error('Error updating user: ' + error.message);
			}
		},

		async deleteUser(mail) {
			try {
				const response = await $axios.delete('/user', {
					data: { mail }, // Utilisez l'objet data pour envoyer les données au format JSON
					requiresAuth: true,
				});

				if (response.status === 404) {
					throw new Error('User not found');
				}

				return response;
			} catch (error) {
				throw new Error('Error deleting user: ' + error.message);
			}
		},
	},
	getters: {},
});
