<template>
	<div
		class="bg-white rounded-lg p-4 shadow-md"
		:class="{
			'border-green-500 border-8': matchResult === 'V',
			'border-yellow-500 border-8': matchResult === 'E',
			'border-red-500 border-8': matchResult === 'D',
		}"
	>
		<div class="flex flex-col items-center">
			<div class="mb-2 font-semibold text-lg">{{ game.Date }}</div>
			<div class="mb-2">
				<span class="font-semibold">{{ game['Équipe 1'] }}</span>
				<span class="mx-2">vs</span>
				<span class="font-semibold">{{ game['Équipe 2'] }}</span>
			</div>
			<div class="mb-2">
				{{
					game.MatchJoue === 'X'
						? game.Score1 + ' - ' + game.Score2
						: game.Heure
				}}
			</div>
			<div class="mb-2">
				<span class="font-semibold">Lieu:</span> {{ game.Lieu }}
			</div>
			<div v-if="game.MatchJoue === 'X'">
				<div class="mb-2">
					<span class="font-semibold">Résultat:</span>
					{{ getMatchResult(game) }}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		game: Object, // Propriété pour passer les données du match depuis le composant parent
	},
	computed: {
		matchResult() {
			return this.getMatchResult(this.game);
		},
	},
	methods: {
		getMatchResult(game) {
			if (game.MatchJoue === 'X') {
				const score1 = game.Score1;
				const score2 = game.Score2;
				if (game['Équipe 1'] === 'EFREI') {
					if (score1 > score2) {
						return 'V';
					} else if (score1 === score2) {
						return 'E';
					} else {
						return 'D';
					}
				} else {
					// L'autre équipe est EFREI
					if (score1 < score2) {
						return 'V';
					} else if (score1 === score2) {
						return 'E';
					} else {
						return 'D';
					}
				}
			}
			return ''; // Si le match n'a pas été joué
		},
	},
};
</script>

<style scoped></style>
