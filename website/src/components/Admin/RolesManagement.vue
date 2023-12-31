<template>
	<div class="container my-auto mx-auto p-4">
		<h1 class="text-3xl font-semibold mb-4">Gestion des Rôles</h1>

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

		<!-- Formulaire de création de rôle -->
		<form
			v-if="activeForm === 'create'"
			class="mb-4"
			@submit.prevent="createRole"
		>
			<div class="form-group">
				<label for="createName" class="block">Nom *</label>
				<input
					id="createName"
					v-model="roleData.title"
					required
					class="input"
				/>
			</div>

			<div class="form-group">
				<label class="block">Permissions *</label>
				<div
					class="flex flex-row justify-center items-start mx-auto w-full"
				>
					<div class="flex flex-row justify-evenly w-full">
						<label
							v-for="(permission, index) in Object.keys(
								roleData.permissions
							)"
							:key="index"
							class="flex flex-col"
						>
							{{ permission }}
							<label
								v-for="(
									permissionValue, valueIndex
								) in Object.keys(
									roleData.permissions[permission]
								)"
								:key="valueIndex"
								class="checkbox-label"
							>
								<input
									v-model="
										roleData.permissions[permission][
											permissionValue
										]
									"
									type="checkbox"
									class="checkbox-input"
								/>
								{{ permissionValue }}
							</label>
						</label>
					</div>
				</div>
			</div>

			<div class="form-group">
				<label for="createColor" class="block">Couleur *</label>
				<select id="createColor" v-model="roleData.color" class="input">
					<option
						v-for="color in colorsList"
						:key="color"
						:value="color"
						:class="`color-${color}`"
						style="width: 1.5rem; height: 1.5rem"
						class="inline-block rounded-full mr-2"
						s
					>
						<span
							:style="`{ background: ${color} }`"
							style="
								padding: 7px;
								text-align: center;
								margin-top: 20px;
								display: inline-block;
							"
						></span>
						{{ color }}
					</option>
				</select>
			</div>

			<button type="submit" class="btn-primary">Valider</button>
		</form>

		<!-- Formulaire de lecture de rôle -->
		<form
			v-if="activeForm === 'read'"
			class="mb-4"
			@submit.prevent="readRole"
		>
			<div class="form-group">
				<label for="readName" class="block">Nom</label>
				<input id="readName" v-model="roleData.title" class="input" />
			</div>

			<button type="submit" class="btn-primary">Chercher</button>
		</form>

		<!-- Formulaire de mise à jour de rôle -->

		<form
			v-if="activeForm === 'update'"
			class="mb-4"
			@submit.prevent="updateRole"
		>
			<div class="form-group">
				<label for="updateName" class="block">Nom *</label>
				<input
					id="updateName"
					v-model="roleData.title"
					required
					class="input"
				/>
			</div>

			<div class="form-group">
				<label class="block">Permissions *</label>
				<div
					class="flex flex-row justify-center items-start mx-auto w-full"
				>
					<div class="flex flex-row justify-evenly w-full">
						<label
							v-for="(permission, index) in Object.keys(
								roleData.permissions
							)"
							:key="index"
							class="flex flex-col"
						>
							{{ permission }}
							<label
								v-for="(
									permissionValue, valueIndex
								) in Object.keys(
									roleData.permissions[permission]
								)"
								:key="valueIndex"
								class="checkbox-label"
							>
								<input
									v-model="
										roleData.permissions[permission][
											permissionValue
										]
									"
									type="checkbox"
									class="checkbox-input"
								/>
								{{ permissionValue }}
							</label>
						</label>
					</div>
				</div>
			</div>

			<div class="form-group">
				<label for="updateColor" class="block">Couleur</label>
				<select id="updateColor" v-model="roleData.color" class="input">
					<option
						v-for="color in colorsList"
						:key="color"
						:value="color"
						:class="`color-${color}`"
						style="width: 1.5rem; height: 1.5rem"
						class="inline-block rounded-full mr-2"
						s
					>
						<span
							:style="`{ background: ${color} }`"
							style="
								padding: 7px;
								text-align: center;
								margin-top: 20px;
								display: inline-block;
							"
						></span>
						{{ color }}
					</option>
				</select>
			</div>

			<button type="submit" class="btn-primary">Valider</button>
		</form>

		<!-- Formulaire de suppression de rôle -->
		<form
			v-if="activeForm === 'delete'"
			class="mb-4"
			@submit.prevent="deleteRole"
		>
			<div class="form-group">
				<label for="deleteName" class="block">Name *</label>
				<input
					id="deleteName"
					v-model="roleData.title"
					required
					class="input"
				/>
			</div>

			<button type="submit" class="btn-primary">Supprimer le rôle</button>
		</form>

		<!-- Afficher les résultats des actions -->
		<div v-if="result" class="mb-4">
			<div class="result-message">
				<h2 class="text-xl font-semibold mb-2">Résultat:</h2>
				<p>{{ result }}</p>
			</div>
		</div>

		<!-- Liste des utilisateurs -->
		<RoleList v-if="activeForm === 'read'" :role-list="roleList" />
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoleStore } from '@/stores/role.store';
import RoleList from '@/components/RoleList.vue';

// Déclarez une variable pour stocker la liste d'utilisateurs
const roleList = ref([]);

const activeForm = ref('create');
const result = ref(null);

const roleStore = useRoleStore();

// Données pour les formulaires de création, mise à jour, lecture et suppression
const roleData = ref({
	title: '',
	permissions: {
		photo: {
			CREATE: false,
			READ: false,
			UPDATE: false,
			DELETE: false,
		},
		planning: {
			CREATE: false,
			READ: false,
			UPDATE: false,
			DELETE: false,
		},
		role: {
			CREATE: false,
			READ: false,
			UPDATE: false,
			DELETE: false,
		},
		self: {
			CREATE: false,
			READ: false,
			UPDATE: false,
			DELETE: false,
		},
		user: {
			CREATE: false,
			READ: false,
			UPDATE: false,
			DELETE: false,
		},
	},
	color: '',
});

const colorsList = ref([
	'red',
	'orange',
	'amber',
	'yellow',
	'lime',
	'green',
	'emerald',
	'blue',
	'teal',
	'cyan',
	'sky',
	'indigo',
	'violet',
	'purple',
	'fuchsia',
	'pink',
	'rose',
	'grey',
]);

// Fonctions pour changer le formulaire actif
const changeForm = (formName) => {
	activeForm.value = formName;
	result.value = '';
	roleData.value.title = '';
	roleData.value.permissions = {
		photo: {
			CREATE: false,
			READ: false,
			UPDATE: false,
			DELETE: false,
		},
		planning: {
			CREATE: false,
			READ: false,
			UPDATE: false,
			DELETE: false,
		},
		role: {
			CREATE: false,
			READ: false,
			UPDATE: false,
			DELETE: false,
		},
		self: {
			CREATE: false,
			READ: false,
			UPDATE: false,
			DELETE: false,
		},
		user: {
			CREATE: false,
			READ: false,
			UPDATE: false,
			DELETE: false,
		},
	};
	roleData.value.color = '';
	roleList.value = [];
};

// Fonction pour générer roleData à partir des objets booléens des cases à cocher
const generateRoleData = () => {
	const newRoleData = {
		title: roleData.value.title,
		permissions: {
			photo: [],
			planning: [],
			role: [],
			self: [],
			user: [],
		},
		color: roleData.value.color,
	};

	for (const permission in roleData.value.permissions) {
		const permissionList = Object.values(
			roleData.value.permissions[permission]
		);
		const indexArray = permissionList
			.map((value, index) => (value ? index : -1))
			.filter((index) => index !== -1);

		newRoleData.permissions[permission] = indexArray;
	}

	return newRoleData;
};

// Fonctions pour les actions (create, update, read, delete)
const createRole = async () => {
	result.value = '';
	try {
		const newRoleData = generateRoleData();
		const response = await roleStore.createRole(newRoleData);
		if (response) {
			result.value = 'Role créé'; // Message de succès ou autre traitement
		} else {
			result.value = 'Un role possédant ce nom existe déjà'; // Message d'erreur
		}
	} catch (error) {
		result.value = 'Error creating role: ' + error.message;
	}
};

const readRole = async () => {
	result.value = '';
	try {
		// Appelez la méthode du store pour lire un compte
		roleList.value = [];
		const response = await roleStore.readRole({
			title: roleData.value.title,
		});
		roleList.value = response; // Mettez à jour la liste de comptes
	} catch (error) {
		result.value = 'Error reading role: ' + error.message;
	}
};

const updateRole = async () => {
	result.value = '';
	try {
		const newRoleData = generateRoleData();
		const response = await roleStore.updateRole(newRoleData);
		if (response.data === false) {
			result.value = 'Role non trouvé'; // Message d'erreur
		} else {
			result.value = 'Role modifié'; // Message de succès ou autre traitement
		}
	} catch (error) {
		result.value = 'Error updating role: ' + error.message;
	}
};

const deleteRole = async () => {
	result.value = '';
	try {
		const response = await roleStore.deleteRole(roleData.value.title);
		if (response.data === true) {
			result.value = 'Role supprimé'; // Message de succès ou autre traitement
		} else {
			result.value = 'Role non trouvé'; // Message d'erreur
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
.role-list {
	margin-top: 20px;
	border: 1px solid #ccc;
	border-radius: 5px;
	padding: 10px;
	text-align: left;
}

.role-list-item {
	margin-bottom: 10px;
}

.role-list-item:last-child {
	margin-bottom: 0;
}

.checkbox-label {
	display: flex;
	align-items: center;
}

.checkbox-input {
	margin-right: 10px; /* Espace entre chaque case à cocher */
}

/* Couleurs des rôles dans le sass */
</style>
