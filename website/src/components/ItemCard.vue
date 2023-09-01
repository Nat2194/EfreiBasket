<template>
	<router-link
		class="border rounded-md flex flex-col p-2 w-48 gap-2"
		:to="'/buy/' + item.id_item"
	>
		<img class="h-36 mx-auto" :src="`${url}/img/${item.ref}.jpeg`" alt="" />
		<div class="text-sm line-clamp-2 h-10">{{ item.model }}</div>
		<div class="text-xl font-semibold">{{ item.price }}$</div>
		<div class="text-xs bg-gray-200 p-1 font-semibold w-fit">
			{{ item.quantity }} in stock
		</div>
	</router-link>
</template>

<script setup>
const url = import.meta.env.VITE_API_URL;
console.log(url);
defineProps({
	item: {
		type: Object,
		required: true,
	},
});
</script>
