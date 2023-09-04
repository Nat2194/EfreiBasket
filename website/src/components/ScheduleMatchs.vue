<template>
	<div class="container mx-auto mt-8">
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
		// Vous pouvez utiliser Axios pour récupérer les données depuis le backend.
		// Pour l'exemple, nous allons simplement utiliser les données en dur :
		this.schedule = [
			{
				Poule: 'BBME2 BAS B - BASKET BALL (NIVEAU 2 : GRANDES ECOLES - M)',
				Date: '09/02/2023',
				Heure: '16:30',
				'Équipe 1': 'EFREI',
				'Équipe 2': 'ECE PARIS (2)',
				Lieu: 'LECLAIRE',
				'Arbitre(s)': '',
				Commentaires: '',
				Score1: 57,
				Score2: 39,
				Score1Halftime: 57,
				Score2Halftime: 39,
				'T.Vert1': '',
				'T.Vert2': '',
				Forf1: '',
				Forf2: '',
				F1nd: '',
				F2nd: '',
				MatchJoue: 'X',
			},
			{
				Poule: 'BBME2 BAS B - BASKET BALL (NIVEAU 2 : GRANDES ECOLES - M)',
				Date: '09/03/2023',
				Heure: '14:00',
				'Équipe 1': 'EPF CACHAN',
				'Équipe 2': 'EFREI',
				Lieu: 'US METRO 3',
				'Arbitre(s)': '',
				Commentaires: '',
				Score1: 50,
				Score2: 45,
				Score1Halftime: 50,
				Score2Halftime: 45,
				'T.Vert1': '',
				'T.Vert2': '',
				Forf1: '',
				Forf2: '',
				F1nd: '',
				F2nd: '',
				MatchJoue: 'X',
			},
			{
				Poule: 'BBME2 BAS B - BASKET BALL (NIVEAU 2 : GRANDES ECOLES - M)',
				Date: '16/03/2023',
				Heure: '14:00',
				'Équipe 1': 'EFREI',
				'Équipe 2': 'SCIENCES PO ST GERMAIN EN LAYE',
				Lieu: 'KELLERMANN',
				'Arbitre(s)': '',
				Commentaires: '',
				Score1: 69,
				Score2: 47,
				Score1Halftime: 69,
				Score2Halftime: 47,
				'T.Vert1': '',
				'T.Vert2': '',
				Forf1: '',
				Forf2: '',
				F1nd: '',
				F2nd: '',
				MatchJoue: 'X',
			},
			{
				Poule: 'BBME2 BAS B - BASKET BALL (NIVEAU 2 : GRANDES ECOLES - M)',
				Date: '30/03/2023',
				Heure: '14:00',
				'Équipe 1': 'EFREI',
				'Équipe 2': 'ECOLE POLYTECHNIQUE (2)',
				Lieu: 'T5 (Polytechnique)',
				'Arbitre(s)': '',
				Commentaires: '',
				Score1: 54,
				Score2: 49,
				Score1Halftime: 54,
				Score2Halftime: 49,
				'T.Vert1': '',
				'T.Vert2': '',
				Forf1: '',
				Forf2: '',
				F1nd: '',
				F2nd: '',
				MatchJoue: 'X',
			},
			{
				Poule: 'BBME2 BAS B - BASKET BALL (NIVEAU 2 : GRANDES ECOLES - M)',
				Date: '13/04/2023',
				Heure: '15:30',
				'Équipe 1': 'ESPCI',
				'Équipe 2': 'EFREI',
				Lieu: 'KELLERMANN',
				'Arbitre(s)': '',
				Commentaires: '',
				Score1: 0,
				Score2: 0,
				Score1Halftime: 0,
				Score2Halftime: 0,
				'T.Vert1': '',
				'T.Vert2': '',
				Forf1: '',
				Forf2: '',
				F1nd: '',
				F2nd: '',
				MatchJoue: '',
			},
		];
	},
};
</script>
