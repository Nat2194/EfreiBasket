<template>
	<div class="container my-auto mx-auto p-4">
		<h1 class="text-3xl font-semibold mb-4">Gestion des Plannings</h1>

		{{ eventData }}

		<!-- Bouton carré bleu en haut à droite -->
		<button
			class="btn-reload absolute top-0 right-0 p-4 m-4 bg-blue-500 rounded-full text-white"
			@click="reloadSchedule()"
		>
			<img
				class="icon-reload object-contain h-6"
				src="https://htmlacademy.ru/assets/icons/reload-6x-white.png"
			/>
		</button>

		<div class="space-x-4 mb-4">
			<!-- Style des boutons pour changer de formulaire -->
			<button
				class="btn-primary"
				:class="{ 'btn-active': activeForm === 'create' }"
				@click="changeForm('create')"
			>
				Créer
			</button>
			<button
				class="btn-primary"
				:class="{ 'btn-active': activeForm === 'update' }"
				@click="changeForm('update')"
			>
				Modifier
			</button>
			<button
				class="btn-primary"
				:class="{ 'btn-active': activeForm === 'read' }"
				@click="changeForm('read')"
			>
				Chercher
			</button>
			<button
				class="btn-primary"
				:class="{ 'btn-active': activeForm === 'delete' }"
				@click="changeForm('delete')"
			>
				Supprimer
			</button>
		</div>

		<!-- Formulaire de création d'entraînement-->
		<!--TODO: remplacer par un form plus général pour créer différents types d'events-->
		<form
			v-if="activeForm === 'create'"
			class="mb-4"
			@submit.prevent="createEvent"
		>
			<div class="form-group">
				<label for="createTitle" class="block">Titre *</label>
				<input
					id="createTitle"
					v-model="eventData.title"
					required
					class="input"
				/>
			</div>

			<div class="form-group">
				<!-- TODO: boutons pour les groupId-->
				<label for="createGroup" class="block">Groupe *</label>
				<input
					id="createGroup"
					v-model="eventData.groupId"
					class="input"
					required
				/>
			</div>

			<div class="form-group">
				<label for="createStart" class="block">Date de début *</label>
				<input
					id="createStart"
					v-model="eventData.start"
					type="datetime-local"
					class="input"
					required
				/>
			</div>

			<div class="form-group">
				<label for="createEnd" class="block">Date de fin *</label>
				<input
					id="createEnd"
					v-model="eventData.end"
					type="datetime-local"
					class="input"
					required
				/>
			</div>

			<button type="submit" class="btn-primary">Valider</button>
		</form>

		<!-- Formulaire de mise à jour d'utilisateur -->
		<form
			v-if="activeForm === 'update'"
			class="mb-4"
			@submit.prevent="updateEvent"
		>
			<CalendarWidget
				v-if="eventData.id == null"
				:admin="true"
				@event-clicked="handleEventClicked"
			/>
			<div class="form-group">
				<label for="updateTitle" class="block">Titre </label>
				<input
					id="updateTitle"
					v-model="eventData.title"
					class="input"
				/>
			</div>

			<div class="form-group">
				<label for="updateGroup" class="block">Groupe</label>
				<input
					id="updateGroup"
					v-model="eventData.groupId"
					class="input"
				/>
			</div>

			<div class="form-group">
				<label for="updateStart" class="block">Date de début:</label>
				<input
					id="updateStart"
					v-model="eventData.start"
					type="datetime-local"
					class="input"
				/>
			</div>

			<div class="form-group">
				<label for="updateEnd" class="block">Date de fin:</label>
				<input
					id="updateEnd"
					v-model="eventData.end"
					type="datetime-local"
					class="input"
				/>
			</div>

			<button type="submit" class="btn-primary">Valider</button>
		</form>

		<!-- Formulaire de suppression d'utilisateur -->
		<form
			v-if="activeForm === 'delete'"
			class="mb-4"
			@submit.prevent="deleteEvent"
		>
			<CalendarWidget
				v-if="eventData.id == null"
				:admin="true"
				@event-clicked="handleEventClicked"
			/>

			<div v-if="eventData.id" class="bg-gray-100 p-4 rounded-lg mt-4">
				<h2 class="text-lg font-semibold mb-2">
					Evénement sélectionné :
				</h2>
				<ul>
					<li><strong>ID:</strong> {{ eventData.id }}</li>
					<li>
						<strong>Date de début:</strong> {{ eventData.start }}
					</li>
					<li><strong>Date de fin:</strong> {{ eventData.end }}</li>
					<li><strong>Titre:</strong> {{ eventData.title }}</li>
					<li><strong>Groupe ID:</strong> {{ eventData.groupId }}</li>
				</ul>
			</div>

			<button type="submit" class="btn-primary">
				Supprimer le compte
			</button>
		</form>

		<!-- Afficher les résultats des actions -->
		<div v-if="result" class="mb-4">
			<div class="result-message">
				<h2 class="text-xl font-semibold mb-2">Résultat:</h2>
				<p>{{ result }}</p>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { useScheduleStore } from '@/stores/schedule.store';
import { useCalendarStore } from '@/stores/calendar.store';
import CalendarWidget from '@/components/CalendarWidget.vue';

const activeForm = ref('create');
const result = ref(null);
const scheduleStore = useScheduleStore();
const calendarStore = useCalendarStore();

// Données pour les formulaires de création, mise à jour, lecture et suppression
const eventData = ref({
	id: null,
	start: null,
	end: null,
	title: '',
	groupId: '',
});

// Fonctions pour changer le formulaire actif
const changeForm = (formName) => {
	activeForm.value = formName;
	result.value = '';
	eventData.value.id = null;
	eventData.value.start = null;
	eventData.value.end = null;
	eventData.value.title = '';
	eventData.value.groupId = '';
};

// Fonctions pour les actions (create, update, read, delete)
const createEvent = async () => {
	result.value = '';
	const start = new Date(eventData.value.start);
	start.setHours(start.getHours() + 1);

	const end = new Date(eventData.value.end);
	end.setHours(end.getHours() + 1);

	eventData.value.start = start.toISOString().slice(0, 16);
	eventData.value.end = end.toISOString().slice(0, 16);
	try {
		const response = await calendarStore.createEvent(eventData.value);
		if (response) {
			result.value = 'Entraînement créé'; // Message de succès ou autre traitement
		} else {
			result.value = 'Un entraînement existe déjà à ce moment'; // Message d'erreur
		}
	} catch (error) {
		result.value = 'Error creating practice: ' + error.message;
	}
};

const updateEvent = async () => {
	result.value = '';
	const start = new Date(eventData.value.start);
	start.setHours(start.getHours() + 1);

	const end = new Date(eventData.value.end);
	end.setHours(end.getHours() + 1);

	eventData.value.start = start.toISOString().slice(0, 16);
	eventData.value.end = end.toISOString().slice(0, 16);
	try {
		const response = await calendarStore.updateEvent(eventData.value);
		if (response.data === false) {
			result.value = 'Evénement non trouvé'; // Message d'erreur
		} else {
			result.value = 'Evénement modifié'; // Message de succès ou autre traitement
		}
	} catch (error) {
		result.value = 'Error updating event: ' + error.message;
	}
};

const deleteEvent = async () => {
	result.value = '';
	try {
		const response = await calendarStore.deleteEvent(eventData.value.id);
		if (response.data === 204) {
			result.value = 'Evénement supprimé'; // Message de succès ou autre traitement
		} else {
			result.value = 'Evénement non trouvé'; // Message d'erreur
		}
	} catch (error) {
		result.value = error.message;
	}
};

const reloadSchedule = async () => {
	await scheduleStore.reloadSchedule();
};

const handleEventClicked = async (event) => {
	// Réagir à l'événement personnalisé ici
	console.log('Événement cliqué dans le composant parent :', event);
	const found_event = await calendarStore.getEventbyId(event.id);
	console.log(found_event);
	eventData.value.id = event.id;
	eventData.value.groupId = found_event.groupId;
	eventData.value.title = found_event.title;

	const start = new Date(found_event.start);
	start.setHours(start.getHours() + 1);

	const end = new Date(found_event.end);
	end.setHours(end.getHours() + 1);

	eventData.value.start = start.toISOString().slice(0, 16);
	eventData.value.end = end.toISOString().slice(0, 16);
};
</script>
