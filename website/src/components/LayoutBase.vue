<template>
	<div class="flex flex-col gap-2 relative">
		<TestHeader />
		<div class="flex-grow min-h-[80vh] mt-44 w-4/5 mx-auto">
			<slot />
		</div>
		<Footer />
	</div>
</template>

<script setup>
import NavBar from '@/components/NavBar.vue';
import Footer from '@/components/Footer.vue';
import TestHeader from './TestHeader.vue';
</script>
