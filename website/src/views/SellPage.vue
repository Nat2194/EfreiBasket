<template>
	<LayoutBase>
		<div class="flex flex-col gap-4">
			<BoxSelector
				v-model="selectedModel"
				:choices="itemsStore.items.map((el) => el.model)"
			/>
			<BoxSelector
				v-model="selectedSize"
				:choices="[
					'3.5',
					'4',
					'4.5',
					'5',
					'5.5',
					'6',
					'6.5',
					'7',
					'7.5',
					'8',
					'8.5',
					'9',
					'9.5',
					'10',
					'10.5',
					'11',
					'11.5',
					'12',
					'12.5',
					'13',
					'13.5',
					'14',
					'14.5',
					'15',
					'15.5',
					'16',
					'16.5',
					'17',
					' 17.5',
					'18',
					'XXS',
					'XS',
					'S',
					'M',
					'L',
					'XL',
					'XXL',
					'XXXL',
				]"
			/>
			<div v-if="selectedModel && selectedSize" class="flex gap-4">
				<img
					:src="`${url}/img/${selectedObject?.ref}.jpeg`"
					class="w-1/2"
					alt=""
				/>
				<div class="flex flex-col justify-around grow">
					<div class="flex flex-col gap-2">
						<div class="text-xl font-semibold">
							{{ selectedObject?.model }}
						</div>
						<div class="text-sm text-gray-500">
							{{ selectedObject?.brand_name }} -
							{{ selectedObject?.ref }}
						</div>
					</div>
					<div class="flex flex-col gap-4">
						<div class="flex items-center gap-2">
							Price:
							<InputBase
								v-model="price"
								class="p-2"
								type="number grow"
								placeholder=""
							/>$
						</div>
						<div class="flex items-center gap-2">
							Quantity:
							<InputBase
								v-model="quantity"
								class="p-2"
								type="number grow"
								placeholder=""
							/>
						</div>

						<button
							class="bg-green-900 rounded-md text-white font-semibold w-full p-2"
							@click="sell"
						>
							Sell
						</button>
					</div>
				</div>
			</div>
		</div>
	</LayoutBase>
</template>

<script setup>
import LayoutBase from '@/components/LayoutBase.vue';
import { useItemsStore } from '../stores/items.store';
import { useStocksStore } from '../stores/stocks.store';
import { useUsersStore } from '../stores/users.store';
import { onMounted, ref, computed } from 'vue';
import BoxSelector from '../components/BoxSelector.vue';
import { useRouter } from 'vue-router';
import InputBase from '../components/InputBase.vue';

const itemsStore = useItemsStore();
const stocksStore = useStocksStore();
const usersStore = useUsersStore();
const router = useRouter();

const url = import.meta.env.VITE_API_URL;
const selectedModel = ref('');
const selectedSize = ref('');
const price = ref('');
const quantity = ref('');

if (!usersStore.user) {
	router.push('/login');
}

const selectedObject = computed(() => {
	return itemsStore.items.find((el) => el.model === selectedModel.value);
});

const sell = () => {
	stocksStore.createStock({
		id_item: selectedObject.value.id_item,
		size: selectedSize.value,
		seller: usersStore.user.id_user,
		quantity: quantity.value,
		price: price.value,
	});
	router.push('/browse');
};

onMounted(async () => {
	await itemsStore.getItems();
});
</script>
