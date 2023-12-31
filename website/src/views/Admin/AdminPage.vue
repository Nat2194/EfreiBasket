<template>
	<div class="container my-auto mx-auto p-4">
		<div class="flex flex-row items-center">
			<div class="absolute mt-12">
				<router-link to="/" class="!text-black logo mr-4">
					<img
						src="@/assets/img/logos/efreibasketlogo.svg"
						class="object-contain h-20"
					/>
				</router-link>
			</div>
			<div class="flex flex-row justify-center mb-4 w-full">
				<h1 class="text-3xl font-semibold">Admin Dashboard</h1>
			</div>
		</div>

		<div class="space-x-4 mb-4">
			<!-- Style des boutons pour changer de formulaire -->
			<button
				class="btn-primary"
				:class="{ 'btn-active': activeForm === 'accounts' }"
				@click="changeForm('accounts')"
			>
				Comptes
			</button>
			<button
				class="btn-primary"
				:class="{ 'btn-active': activeForm === 'roles' }"
				@click="changeForm('roles')"
			>
				Roles
			</button>
			<button
				class="btn-primary"
				:class="{ 'btn-active': activeForm === 'schedule' }"
				@click="changeForm('schedule')"
			>
				Planning
			</button>
		</div>

		<!-- Ajout du trait horizontal bleu -->
		<div class="border-b-4 rounded-3xl border-blue-500 mb-4"></div>

		<!-- Rendu conditionnel en fonction de activeForm -->
		<component :is="activeFormComponent" />
	</div>
</template>

<script setup>
import { ref, computed } from 'vue';
import AccountsManagement from '../../components/Admin/AccountsManagement.vue';
import RolesManagement from '../../components/Admin/RolesManagement.vue';
import ScheduleManagement from '../../components/Admin/ScheduleManagement.vue';

const activeForm = ref('create');

// Fonctions pour changer le formulaire actif
const activeFormComponent = computed(() => {
	switch (activeForm.value) {
		case 'accounts':
			return AccountsManagement;
		case 'roles':
			return RolesManagement;
		case 'schedule':
			return ScheduleManagement;
		default:
			return AccountsManagement; // Composant par défaut
	}
});

const changeForm = (formName) => {
	activeForm.value = formName;
};
</script>

<style scoped>
/* Styles spécifiques au composant */
.container {
	text-align: center;
	padding: 20px;
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
</style>
