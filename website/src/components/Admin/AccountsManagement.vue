<template>
	<div class="container my-auto mx-auto p-4">
		<h1 class="text-3xl font-semibold mb-4">Gestion des Comptes Respos</h1>

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

		<!-- Formulaire de création d'utilisateur -->
		<form
			v-if="activeForm === 'create'"
			class="mb-4"
			@submit.prevent="createUser"
		>
			<div class="form-group">
				<label for="createLastName" class="block">Nom *</label>
				<input
					id="createLastName"
					v-model="userData.lastname"
					required
					class="input"
				/>
			</div>

			<div class="form-group">
				<label for="createFirstName" class="block">Prénom *</label>
				<input
					id="createFirstName"
					v-model="userData.firstname"
					required
					class="input"
				/>
			</div>

			<div class="form-group">
				<label for="createMail" class="block">Mail *</label>
				<input
					id="createMail"
					v-model="userData.mail"
					required
					class="input"
				/>
			</div>

			<div class="form-group">
				<label for="createPassword" class="block">Mot de passe *</label>
				<input
					id="createPassword"
					v-model="userData.password"
					type="password"
					required
					class="input"
				/>
			</div>

			<button type="submit" class="btn-primary">Valider</button>
		</form>

		<!-- Formulaire de mise à jour d'utilisateur -->
		<form
			v-if="activeForm === 'update'"
			class="mb-4"
			@submit.prevent="updateUser"
		>
			<div class="form-group">
				<label for="updateMail" class="block">Mail *</label>
				<input
					id="updateMail"
					v-model="userData.mail"
					required
					class="input"
				/>
			</div>

			<div class="form-group">
				<label for="updateLastName" class="block">Nom</label>
				<input
					id="updateLastName"
					v-model="userData.lastname"
					class="input"
				/>
			</div>

			<div class="form-group">
				<label for="updateFirstName" class="block">Prénom</label>
				<input
					id="updateFirstName"
					v-model="userData.firstname"
					class="input"
				/>
			</div>

			<div class="form-group">
				<label for="updatePassword" class="block">Mot de passe</label>
				<input
					id="updatePassword"
					v-model="userData.password"
					type="password"
					class="input"
				/>
			</div>

			<button type="submit" class="btn-primary">Valider</button>
		</form>

		<!-- Formulaire de lecture d'utilisateur -->
		<form
			v-if="activeForm === 'read'"
			class="mb-4"
			@submit.prevent="readUser"
		>
			<div class="form-group">
				<label for="readLastName" class="block">Nom</label>
				<input
					id="readLastName"
					v-model="userData.lastname"
					class="input"
				/>
			</div>

			<div class="form-group">
				<label for="readFirstName" class="block">Prénom</label>
				<input
					id="readFirstName"
					v-model="userData.firstname"
					class="input"
				/>
			</div>

			<div class="form-group">
				<label for="readMail" class="block">Mail</label>
				<input id="readMail" v-model="userData.mail" class="input" />
			</div>

			<button type="submit" class="btn-primary">Chercher</button>
		</form>

		<!-- Formulaire de suppression d'utilisateur -->
		<form
			v-if="activeForm === 'delete'"
			class="mb-4"
			@submit.prevent="deleteUser"
		>
			<div class="form-group">
				<label for="deleteMail" class="block">Mail *</label>
				<input
					id="deleteMail"
					v-model="userData.mail"
					required
					class="input"
				/>
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

		<!-- Liste des utilisateurs -->
		<UserList v-if="activeForm === 'read'" :user-list="userList" />
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth.store';
import UserList from '@/components/UserList.vue';

// Déclarez une variable pour stocker la liste d'utilisateurs
const userList = ref([]);

const activeForm = ref('create');
const result = ref(null);

const authStore = useAuthStore();

// Données pour les formulaires de création, mise à jour, lecture et suppression
const userData = {
	lastname: '',
	firstname: '',
	mail: '',
	password: '',
};

// Fonctions pour changer le formulaire actif
const changeForm = (formName) => {
	activeForm.value = formName;
	result.value = '';
	userData.lastname = '';
	userData.firstname = '';
	userData.mail = '';
	userData.password = '';
	userList.value = [];
};

// Fonctions pour les actions (create, update, read, delete)
const createUser = async () => {
	result.value = '';
	try {
		const response = await authStore.createUser(userData);
		if (response) {
			result.value = 'Compté créé'; // Message de succès ou autre traitement
		} else {
			result.value = 'Un compte utilise déjà cette adresse email'; // Message d'erreur
		}
	} catch (error) {
		result.value = 'Error creating user: ' + error.message;
	}
};

const readUser = async () => {
	result.value = '';
	try {
		// Appelez la méthode du store d'authentification pour lire un utilisateur
		userList.value = [];
		const response = await authStore.readUser(userData);
		userList.value = response; // Mettez à jour la liste d'utilisateurs
	} catch (error) {
		result.value = 'Error reading user: ' + error.message;
	}
};

const updateUser = async () => {
	result.value = '';
	try {
		const response = await authStore.updateUser(userData);
		if (response.data === false) {
			result.value = 'Compte non trouvé'; // Message d'erreur
		} else {
			result.value = 'Compte modifié'; // Message de succès ou autre traitement
		}
	} catch (error) {
		result.value = 'Error updating user: ' + error.message;
	}
};

const deleteUser = async () => {
	result.value = '';
	try {
		const response = await authStore.deleteUser(userData.mail);
		if (response.data === true) {
			result.value = 'Compte supprimé'; // Message de succès ou autre traitement
		} else {
			result.value = 'Compte non trouvé'; // Message d'erreur
		}
	} catch (error) {
		result.value = error.message;
	}
};
</script>

<style scoped>
/* Styles spécifiques au composant */
.container {
	text-align: center;
	padding: 20px;
}

.form-group {
	margin-bottom: 20px;
}

.input {
	width: 40%;
	padding: 10px;
	border: 1px solid #ccc;
	border-radius: 20px;
}

.btn-primary {
	background-color: #007bff;
	color: #fff;
	border: none;
	padding: 10px 20px;
	border-radius: 5px;
	cursor: pointer;
	transition: background-color 0.3s ease;
}

.btn-primary.btn-active {
	background-color: #0056b3;
}

.result-message {
	background-color: #f2f2f2;
	border: 1px solid #ccc;
	border-radius: 5px;
	padding: 10px;
	text-align: left;
}

/* Styles pour la liste des utilisateurs (ajustez selon vos préférences) */
.user-list {
	margin-top: 20px;
	border: 1px solid #ccc;
	border-radius: 5px;
	padding: 10px;
	text-align: left;
}

.user-list-item {
	margin-bottom: 10px;
}

.user-list-item:last-child {
	margin-bottom: 0;
}
</style>
