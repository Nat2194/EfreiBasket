<template>
	<LayoutBase>
		<div class="flex flex-col gap-4">
			<SliderBase :img-list="sliderImages" />
			<ItemList :item-list="itemsStore.getItemsByType('shoes')">
				<template #title>
					<div class="flex gap-2 items-center">
						Popular sneakers <FireIcon class="h-6 w-6" />
					</div>
				</template>
			</ItemList>
			<ItemList :item-list="itemsStore.getItemsByType('sweat')">
				<template #title>
					<div class="flex gap-2 items-center">
						Hot hoodies <ArrowTrendingUpIcon class="h-6 w-6" />
					</div>
				</template>
			</ItemList>
		</div>
	</LayoutBase>
</template>

<script setup>
import LayoutBase from '@/components/LayoutBase.vue';
import SliderBase from '@/components/SliderBase.vue';
import sliderImg1 from '@/assets/img/slider/1.webp';
import sliderImg2 from '@/assets/img/slider/2.webp';
import ItemList from '@/components/ItemList.vue';
import { FireIcon, ArrowTrendingUpIcon } from '@heroicons/vue/24/outline';
import { useItemsStore } from '@/stores/items.store';

const sliderImages = [sliderImg1, sliderImg2];
const itemsStore = useItemsStore();

itemsStore.getAvailableItems();
</script>
