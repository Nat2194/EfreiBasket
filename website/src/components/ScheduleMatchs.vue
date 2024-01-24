<template>
	<div class="container mx-auto mt-5 mb-10">
		<h1 class="text-2xl font-semibold mb-4">
			Planning des matchs de l'équipe 1
		</h1>
		<div class="grid grid-cols-1 gap-4">
			<BasketMatch
				v-for="(game, index) in schedule"
				:key="index"
				:game="game"
			/>
		</div>
	</div>

	<!-- Rajouter équipe 2 -->
</template>

<script>
import BasketMatch from './BasketMatch.vue';
import { useScheduleStore } from '@/stores/schedule.store';

const scheduleStore = useScheduleStore();

export default {
	components: {
		BasketMatch, // Importez le composant Match
	},
	data() {
		return {
			schedule: [], // Le tableau des données du planning sera stocké ici
		};
	},
	async mounted() {
		// Envoyer une requête GET vers l'API
		this.schedule = await scheduleStore.getSchedule();
	},
};
</script>
