<template>
	<div class="fixed flex flex-col top-0 w-screen bg-white z-10">
		<ul class="flex flex-row items-center justify-center p-4 bg-blue-400">
			<li class="header-text">
				<a>Médias</a>
			</li>
			<li class="header-text">
				<a>Planning</a>
			</li>
			<li>
				<div>
					<router-link
						to="/"
						class="flex items-center gap-2 !text-black logo"
					>
						<img
							src="../assets/img/logos/efreibasketlogo.png"
							class="object-contain h-32"
						/>
					</router-link>
				</div>
			</li>
			<li class="header-text">
				<a>Classement</a>
			</li>
			<li class="header-text">
				<a>Inscription</a>
			</li>
		</ul>
		<div class="flex items-center justify-center bg-gray-100 gap-4 p-2">
			<router-link
				v-for="(item, id) in itemsList"
				:key="id"
				class="text-lg font-medium"
				:to="item.link"
			>
				{{ item.name }}
			</router-link>
		</div>
	</div>
</template>

<script setup>
import { BellIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/outline';
import InputBase from './InputBase.vue';
import { useUsersStore } from '../stores/users.store';

const usersStore = useUsersStore();

const itemsList = [
	{ name: 'Shoes', link: '/browse/shoes' },
	{ name: 'Shirts', link: '/browse/tshirt' },
	{ name: 'Sweats', link: '/browse/sweat' },
	{ name: 'Accessories', link: '/browse/accessories' },
];
</script>

<style lang="scss"></style>
