<template>
	<div class="relative">
		<img
			class="w-full object-cover brightness-50"
			:src="imgList[currentImg]"
		/>
		<div
			class="slider-titles absolute inset-x-0 inset-y-1/2 xl:max-2xl:inset-y-1/3 flex justify-center text-white xl:text-7xl md:lg:text-6xl sm:text-5xl text-3xl font-bold"
		>
			EFREI BASKETBALL
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
	imgList: {
		type: Array,
		required: true,
	},
});

const currentImg = ref(0);

setInterval(() => {
	currentImg.value = (currentImg.value + 1) % props.imgList.length;
}, 10000);
</script>
