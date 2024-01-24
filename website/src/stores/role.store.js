import { defineStore } from 'pinia';
import { $axios } from '@/config/axios';

export const useRoleStore = defineStore({
	id: 'role',
	state: () => ({
		rolesList: [], // Stores the list of roles
		currentRole: null, // Stores the selected role
	}),
	getters: {
		getRoles() {
			return this.rolesList;
		},
		getCurrentRole() {
			return this.currentRole;
		},
	},
	actions: {
		async createRole(roleData) {
			// Envoyez la requête de création de rôle à l'API
			const response = await $axios.post('/role', roleData, {
				requiresAuth: true,
			});
			// Mettez à jour le résultat ou effectuez d'autres actions si nécessaire
			return response.data;
		},

		async readRole(searchData) {
			try {
				const queryParams = new URLSearchParams(searchData).toString();

				// Append the query parameters to the URL
				const url = `/role?${queryParams}`;

				// Send the GET request
				const response = await $axios.get(url, {
					requiresAuth: true,
				});
				// Mettez à jour le résultat ou effectuez d'autres actions si nécessaire
				return response.data;
			} catch (error) {
				throw new Error('Error reading role: ' + error.message);
			}
		},

		async updateRole(dto) {
			try {
				const response = await $axios.patch('/role', dto, {
					requiresAuth: true,
				});
				if (response.status === 404) {
					throw new Error('Role not found');
				}
				return response.data;
			} catch (error) {
				throw new Error('Error updating role: ' + error.message);
			}
		},

		async deleteRole(name) {
			try {
				const response = await $axios.delete('/role', {
					data: { name },
					requiresAuth: true,
				});

				if (response.status === 404) {
					throw new Error('Role not found');
				}

				return response;
			} catch (error) {
				throw new Error('Error deleting role: ' + error.message);
			}
		},
	},
});
