<template>
	<div>
		<h2 class="text-2xl font-semibold mb-4">Role List</h2>
		<div class="bg-white text-black">
			<!-- Utilisez une condition pour afficher le message "No result found" -->
			<div v-if="roleList.length === 0" class="flex flex-wrap">
				<p>No result found</p>
			</div>
			<div v-else class="flex flex-wrap">
				<!-- Affichez la liste de rôles s'il y en a -->
				<div v-for="role in roleList" :key="role.id" class="w-1/2 mb-4">
					<div
						:class="`bg-color-${role.color}`"
						class="p-4 shadow rounded-lg m-2"
					>
						<div class="mb-2">
							<strong>Name:</strong> {{ role.title }}
						</div>
						<div class="mb-2">
							<strong>Permissions:</strong>
							<ul>
								<li
									v-for="(
										permissions, permissionName
									) in role.permissions"
									:key="permissionName"
								>
									{{ permissionName }} :
									{{ formatPermissions(permissions) }}
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		roleList: Array,
	},
	data() {
		return {
			permissionsList: ['CREATE', 'READ', 'UPDATE', 'DELETE'],
			colorsList: [
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
			],
		};
	},
	methods: {
		getPermissionName(permission) {
			return this.permissionsList[permission];
		},
		formatPermissions(permissions) {
			return permissions
				.map((permission) => this.getPermissionName(permission))
				.join(', ');
		},
	},
};
</script>
