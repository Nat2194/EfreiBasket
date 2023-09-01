import axios from 'axios';

export const $axios = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
});

$axios.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		return Promise.reject(error);
	}
);
