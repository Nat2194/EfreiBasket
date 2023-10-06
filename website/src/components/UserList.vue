<template>
	<div>
		<h2>User List</h2>
		<ul>
			<li v-for="user in userList" :key="user.id">
				<strong>Name:</strong> {{ user.firstname }} {{ user.lastname
				}}<br />
				<strong>Mail:</strong> {{ user.mail }}<br />
				<strong>Last Login:</strong>
				{{ user.lastLogin ? formatDate(user.lastLogin) : 'N/A' }}<br />
			</li>
		</ul>
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
