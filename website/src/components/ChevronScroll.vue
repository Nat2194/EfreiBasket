<template>
	<div class="chevron-container">
		<div
			class="chevron-down font-awesome flex flex-row justify-center"
			@click="scrollDown"
		></div>
	</div>
</template>

<script setup>
const scrollDown = () => {
	window.scrollTo({
		top: window.innerHeight, // Vous pouvez ajuster cette valeur pour contrôler la quantité de défilement
		behavior: 'smooth', // Ajoute un défilement fluide
	});
};
</script>
