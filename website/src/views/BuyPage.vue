<template>
	<LayoutBase>
		<div class="flex flex-col gap-12">
			<div class="flex gap-4">
				<img
					:src="`${url}/img/${itemsStore.item[0]?.ref}.jpeg`"
					class="w-1/2"
					alt=""
				/>

				<div class="flex flex-col justify-around grow">
					<div class="flex flex-col gap-2">
						<div class="text-xl font-semibold">
							{{ itemsStore.item[0]?.model }}
						</div>
						<div class="text-sm text-gray-500">
							{{ itemsStore.item[0]?.brand_name }} -
							{{ itemsStore.item[0]?.ref }}
						</div>
					</div>
					<div class="flex flex-col gap-4">
						<BoxSelector v-model="choice" :choices="choices" />
						<div class="text-3xl font-semibold">
							{{ Number(selectedItem.price).toFixed(2) }}$
						</div>
						<div class="bg-gray-200 text-xs w-fit p-2">
							{{ selectedItem.quantity }} in stock
						</div>
						<button
							class="bg-green-900 rounded-md text-white font-semibold w-full p-2"
							@click="buy"
						>
							Buy
						</button>
					</div>
				</div>
			</div>
			<ItemList :item-list="itemsStore.items">
				<template #title>
					<div class="font-semibold">Related items</div>
				</template>
			</ItemList>
		</div>
	</LayoutBase>
</template>

<script setup>
import LayoutBase from '../components/LayoutBase.vue';
import { useItemsStore } from '../stores/items.store';
import { useStocksStore } from '../stores/stocks.store';
import { useRoute } from 'vue-router';
import BoxSelector from '../components/BoxSelector.vue';
import { computed, ref, onMounted, watch } from 'vue';
import ItemList from '../components/ItemList.vue';
const url = import.meta.env.VITE_API_URL;

const itemsStore = useItemsStore();
const stocksStore = useStocksStore();
const route = useRoute();

const choice = ref('');

const choices = computed(() => {
	let choices = [];
	for (let i = 0; i < itemsStore.item.length; i++) {
		if (!(itemsStore.item[i].size in choices)) {
			choices.push(itemsStore.item[i].size);
		}
	}
	return choices;
});

const selectedItem = computed(() => {
	for (let i = 0; i < itemsStore.item.length; i++) {
		if (itemsStore.item[i].size == choice.value) {
			return itemsStore.item[i];
		}
	}
	return 0;
});

const buy = async () => {
	for (let i = 0; i < itemsStore.item.length; i++) {
		if (itemsStore.item[i].size == choice.value) {
			if (itemsStore.item[i].quantity > 1) {
				stocksStore.updateStock(itemsStore.item[i].id_stock, {
					quantity: itemsStore.item[i].quantity - 1,
				});
			} else {
				stocksStore.deleteStock(itemsStore.item[i].id_stock);
			}
			break;
		}
	}

	await itemsStore.getAvailableItem(route.params.id);
	await itemsStore.getAvailableItems();

	choice.value = itemsStore.item[0]?.size;
};

onMounted(async () => {
	await itemsStore.getAvailableItem(route.params.id);
	await itemsStore.getAvailableItems();

	choice.value = itemsStore.item[0]?.size;
});

watch(
	() => route.params.id,
	async () => {
		await itemsStore.getAvailableItem(route.params.id);
		await itemsStore.getAvailableItems();

		choice.value = itemsStore.item[0]?.size;
	}
);
</script>
