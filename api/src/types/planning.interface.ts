export interface Planning {
	Poule: string;
	Date: number;
	Heure: string;
	Équipe1: string;
	Équipe2: string;
	Lieu: string;
	MatchJoue: string | null;
	Score1: number;
	Score2: number;
	Forf1: null | any; // Remplacez "any" par le type correct si nécessaire
	Forf2: null | any; // Remplacez "any" par le type correct si nécessaire
}
