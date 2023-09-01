<template>
	<div class="flex flex-wrap w-full gap-2 text-center">
		<div
			v-for="(choice, i) in choices"
			:key="i"
			class="px-4 py-1 border"
			:class="{
				'border-gray-300': modelValue !== choice,
				'border-green-500 bg-green-100 ': modelValue === choice,
			}"
			@click="$emit('update:modelValue', choice)"
		>
			{{ choice }}
		</div>
	</div>
</template>
<script setup>
defineProps({
	choices: {
		type: Array,
		required: true,
	},
	modelValue: {
		type: String,
		required: true,
	},
});

defineEmits(['update:modelValue']);
</script>
<style lang=""></style>
