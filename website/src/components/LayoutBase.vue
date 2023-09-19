<template>
	<div class="flex flex-col relative">
		<HeaderBar />
		<div class="flex-grow w-full mt-24 bg-very-light-grey">
			<slot />
		</div>
		<FooterBar />
	</div>
</template>

<script setup>
import FooterBar from '@/components/FooterBar.vue';
import HeaderBar from './HeaderBar.vue';
</script>
