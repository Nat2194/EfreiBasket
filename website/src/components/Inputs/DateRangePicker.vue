<template>
	<div>
		<!-- Sélection de la date -->
		<VueDatePicker
			v-model="sessionDate.date"
			format="dd-MM-yyyy"
			placeholder="Sélectionner une date"
			:enable-time-picker="false"
			:model-value="sessionDate.date"
			@update:model-value="emitChanges"
		></VueDatePicker>

		<!-- Sélection de la plage horaire -->
		<div>
			<label for="startTime">Heure de début:</label>
			<input
				id="startTime"
				v-model="sessionDate.startTime"
				type="time"
				@input="emitChanges"
			/>

			<label for="endTime">Heure de fin:</label>
			<input
				id="endTime"
				v-model="sessionDate.endTime"
				type="time"
				@input="emitChanges"
			/>
		</div>
	</div>
</template>

<script setup>
import VueDatePicker from '@vuepic/vue-datepicker';
import { defineProps, defineEmits, ref } from 'vue';

const props = defineProps({
	sessionDate: {
		type: Object,
		required: true,
		default: () => ({
			date: null,
			startTime: null,
			endTime: null,
		}),
	},
});

const sessionDate = ref(props.sessionDate);

const emit = defineEmits(['update:sessionDate']);

const emitChanges = () => {
	emit('update:sessionDate', sessionDate.value);
};
</script>
