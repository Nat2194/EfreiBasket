import axios from 'axios';
import router from '@/router';
import { useAuthStore } from '@/stores/auth.store';

const $axios = axios.create({
	baseURL: 'http://localhost:3000/',
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true,
	requiresAuth: true,
});

$axios.interceptors.request.use((config) => {
	if (config.requiresAuth && !useAuthStore().isLoggedIn()) {
		router.push('/login');
		return false;
	}
	return config;
});

$axios.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		if (error.response.status === 401 || error.response.status === 403) {
			router.push('/login');
		}
		return false;
	}
);

export { $axios };
