<template>
	<div class="relative -mt-24">
		<img
			class="w-full object-cover brightness-50"
			:src="imgList[currentImg]"
		/>
		<div
			class="absolute inset-x-0 inset-y-1/2 xl:max-2xl:inset-y-1/3 flex justify-center"
		>
			<div class="flex flex-col slider-title">
				<h1>EFREI BASKETBALL</h1>
				<ChevronScroll />
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import ChevronScroll from './ChevronScroll.vue';

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
