<template>
	<div class="container mx-auto p-2">
		<div class="space-x-4">
			<button
				class="btn-primary"
				:class="{ 'btn-active': activeSchedule == 1 }"
				@click="changeSchedule(1)"
			>
				Equipe 1
			</button>
			<button
				class="btn-primary"
				:class="{ 'btn-active': activeSchedule == 2 }"
				@click="changeSchedule(2)"
			>
				Equipe 2
			</button>
		</div>
	</div>
	<div class="px-20 pb-20 pt-4 mx-auto mb-10 text-center">
		<h1 class="text-2xl font-semibold mb-4">
			Planning des matchs de l'équipe {{ activeSchedule }}
		</h1>
		<div class="grid grid-cols-1 gap-4">
			<BasketMatch
				v-for="(game, index) in filteredSchedule"
				:key="index"
				:game="game"
			/>
		</div>
	</div>

	<!-- Rajouter équipe 2 -->
</template>

<script>
import { ref, computed } from 'vue';
import BasketMatch from '@/components/BasketMatch.vue';
import { useScheduleStore } from '@/stores/schedule.store';

const scheduleStore = useScheduleStore();

export default {
	components: {
		BasketMatch,
	},
	setup() {
		const activeSchedule = ref(1);

		const schedule = ref([]);

		const changeSchedule = (n) => {
			activeSchedule.value = n;
		};

		const loadSchedule = async () => {
			schedule.value = await scheduleStore.getSchedule();
		};

		loadSchedule();

		// Utilisez une propriété calculée pour filtrer les matchs par la valeur de game.poule
		const filteredSchedule = computed(() => {
			console.log(schedule.value);
			if (activeSchedule.value === 1) {
				// Filtrez les matchs avec game.poule contenant 'NIVEAU 2'
				return schedule.value.filter((game) =>
					game.Poule.includes('NIVEAU 2')
				);
			} else if (activeSchedule.value === 2) {
				// Filtrez les matchs avec game.poule contenant 'NIVEAU 3'
				return schedule.value.filter((game) =>
					game.Poule.includes('NIVEAU 3')
				);
			} else {
				// Pour les autres cas, renvoyez l'ensemble complet du calendrier
				return schedule.value;
			}
		});

		return {
			activeSchedule,
			schedule,
			changeSchedule,
			filteredSchedule,
		};
	},
};
</script>

<style scoped lang="scss"></style>
