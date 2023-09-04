<template>
	<div class="flex flex-col relative">
		<TestHeader />
		<div class="flex-grow w-full">
			<slot />
		</div>
		<FooterBar />
	</div>
</template>

<script setup>
import FooterBar from '@/components/FooterBar.vue';
import TestHeader from './TestHeader.vue';
</script>
