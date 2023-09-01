<template>
	<div class="flex flex-col gap-2 w-full">
		<div class="font-semibold">
			<slot name="title" />
		</div>
		<div
			class="grid grid-rows-1 auto-cols-min grid-flow-col-dense gap-4 overflow-y-auto"
		>
			<ItemCard v-for="(item, i) in itemList" :key="i" :item="item" />
		</div>
	</div>
</template>

<script setup>
import ItemCard from '@/components/ItemCard.vue';

defineProps({
	itemList: {
		type: Array,
		required: true,
	},
});
</script>
