<template>
	<div class="border rounded-md flex items-center" @click="input.focus()">
		<component :is="icon" v-if="icon" class="h-6 w-6 mx-4"></component>
		<input
			ref="input"
			:type="type"
			class="h-full w-full flex-grow outline-none"
			:placeholder="placeholder"
			:value="modelValue"
			:required="required"
			:pattern="pattern"
			@input="$emit('update:modelValue', $event.target.value)"
		/>
	</div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
	placeholder: {
		type: String,
		default: 'Search something...',
	},
	modelValue: {
		type: String,
		default: '',
	},
	type: {
		type: String,
		default: 'text',
	},
	icon: {
		default: null,
		type: Function,
	},
	required: {
		type: Boolean,
		default: false,
	},
	pattern: {
		type: String,
		default: null,
	},
});

defineEmits(['update:modelValue']);

const input = ref(null);
</script>
