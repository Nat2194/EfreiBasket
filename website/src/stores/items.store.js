import { $axios } from '../utils/axios';
import { defineStore } from 'pinia';

export const useItemsStore = defineStore('items', {
	state: () => ({
		items: [],
		item: [],
	}),
	actions: {
		async getItems() {
			const { data } = await $axios.get('/items');
			this.items = data;
		},
		async getAvailableItems() {
			const { data } = await $axios.get('/items/available');
			this.items = data;
		},
		async getAvailableItem(id) {
			const { data } = await $axios.get(`/items/available/${id}`);
			this.item = data;
		},
		async getItem(id) {
			const { data } = await $axios.get(`/items/${id}`);
			this.item = data;
		},
		async createItem(item) {
			const { data } = await $axios.post('/items', item);
			return data;
		},
		async updateItem(id, item) {
			const { data } = await $axios.put(`/items/${id}`, item);
			return data;
		},
		async deleteItem(id) {
			const { data } = await $axios.delete(`/items/${id}`);
			return data;
		},
	},
	getters: {
		getItemsByType: (state) => {
			return (type) => {
				if (type === 'all') {
					return state.items;
				}
				return state.items.filter((item) => item.type === type);
			};
		},
	},
});
