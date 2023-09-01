<template>
	<div class="relative">
		<img class="object-cover" :src="imgList[currentImg]" />
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
}, 5000);
</script>
