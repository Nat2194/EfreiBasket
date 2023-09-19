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
</template>

<script>
import BasketMatch from './BasketMatch.vue';
import axios from 'axios';

export default {
	components: {
		BasketMatch, // Importez le composant Match
	},
	data() {
		return {
			schedule: [], // Le tableau des données du planning sera stocké ici
		};
	},
	mounted() {
		// Envoyer une requête GET vers l'API
		axios
			.get('/schedule') // Assurez-vous que l'URL est correcte
			.then((response) => {
				// Réponse réussie
				this.schedule = response.data; // Stockez les données dans votre variable
			});
	},
};
</script>
