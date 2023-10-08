<template>
	<div>
		<h2 class="text-2xl font-semibold mb-4">User List</h2>
		<div class="flex flex-wrap bg-white text-black">
			<div v-for="user in userList" :key="user.id" class="w-1/2 mb-4">
				<div class="bg-light-blue p-4 shadow rounded-lg m-2">
					<div class="mb-2">
						<strong>Name:</strong> {{ user.firstname }}
						{{ user.lastname }}
					</div>
					<div class="mb-2">
						<strong>Mail:</strong> {{ user.mail }}
					</div>
					<div>
						<strong>Last Login:</strong>
						{{
							user.lastLogin ? formatDate(user.lastLogin) : 'N/A'
						}}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import dayjs from 'dayjs'; // Importez la bibliothèque dayjs

export default {
	props: {
		userList: Array, // Propriété pour recevoir la liste d'utilisateurs
	},
	methods: {
		formatDate(date) {
			if (date) {
				// Utilisez dayjs pour formater la date au format européen (DD/MM/YYYY HH:mm:ss)
				return dayjs(date * 1000).format('DD/MM/YYYY HH:mm:ss');
			} else {
				return 'N/A'; // Ou un autre message par défaut si la date n'existe pas
			}
		},
	},
};
</script>
