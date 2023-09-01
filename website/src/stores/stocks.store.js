import { defineStore } from 'pinia';
import { $axios } from '../utils/axios';

export const useStocksStore = defineStore('stocks', {
	state: () => ({
		stocks: [],
	}),
	actions: {
		async getStocks() {
			const { data } = await $axios.get('/stocks');
			this.stocks = data;
		},
		async getStock(id) {
			const { data } = await $axios.get(`/stocks/${id}`);
			return data;
		},
		async createStock(stock) {
			const { data } = await $axios.post('/stocks', stock);
			return data;
		},
		async updateStock(id, stock) {
			const { data } = await $axios.patch(`/stocks/${id}`, stock);
			return data;
		},
		async deleteStock(id) {
			const { data } = await $axios.delete(`/stocks/${id}`);
			return data;
		},
	},
});
