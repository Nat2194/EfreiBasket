<template>
	<div
		class="bg-white rounded-lg p-4 shadow-md"
		:class="{
			'border-green-500 border-8':
				matchResult === 'V' || matchResult === 'V (Forfait)',
			'border-yellow-500 border-8': matchResult === 'E',
			'border-red-500 border-8':
				matchResult === 'D' || matchResult === 'D (Forfait)',
		}"
	>
		<div class="flex flex-col items-center">
			<div class="mb-2 font-semibold text-lg">
				{{ formatDate(game.Date) }}
			</div>
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
			if (game.MatchJoue) {
				const score1 = game.Score1;
				const score2 = game.Score2;
				if (
					game['Équipe 1'] === 'EFREI' ||
					game['Équipe 1'] === 'EFREI PARIS'
				) {
					if (score1 > score2) {
						return 'V';
					} else if (score1 === score2) {
						if (game.Forf2) {
							return 'V (Forfait)';
						}
						if (game.Forf1) {
							return 'D (Forfait)';
						}
						return 'E';
					} else {
						return 'D';
					}
				} else {
					// L'autre équipe est EFREI
					if (score1 < score2) {
						return 'V';
					} else if (score1 === score2) {
						if (game.Forf1) {
							return 'V (Forfait)';
						}
						if (game.Forf2) {
							return 'D (Forfait)';
						}
						return 'E';
					} else {
						return 'D';
					}
				}
			}
			return ''; // Si le match n'a pas été joué
		},
		formatDate(dateString) {
			// Convertir la chaîne de date en objet Date
			const dateObject = new Date(dateString);

			// Formater la date selon vos besoins (par exemple, au format 'dd/mm/yyyy')
			const formattedDate = `${dateObject.getDate()}/${
				dateObject.getMonth() + 1
			}/${dateObject.getFullYear()}`;

			return formattedDate;
		},
	},
};
</script>

<style scoped></style>
