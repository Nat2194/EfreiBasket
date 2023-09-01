<template>
	<div class="fixed flex flex-col top-0 w-screen bg-white z-10">
		<div class="items-center flex gap-8 p-4">
			<div class="flex gap-2">
				<router-link
					to="/"
					class="flex items-center gap-2 !text-black logo"
				>
					<span class="z-10 bg-white">Stock</span>
					<span class="y">Y</span>
				</router-link>
			</div>
			<InputBase :icon="MagnifyingGlassIcon" class="h-12 flex-grow" />
			<div class="flex gap-8 items-center">
				<div class="flex items-center gap-4">
					<router-link to="/browse">Browse</router-link>
					<router-link to="/about">About</router-link>
					<RouterLink to="/sell">Sell</RouterLink>
					<BellIcon class="h-6 w-6" />
				</div>

				<div class="flex items-center gap-2">
					<router-link v-if="usersStore.user === null" to="/login">
						<button
							class="border-green-900 text-green-900 px-4 py-2 rounded-md border"
						>
							Login
						</button>
					</router-link>
					<router-link v-if="usersStore.user === null" to="/register">
						<button
							class="bg-green-900 text-white px-4 py-2 rounded-md"
						>
							Sign Up
						</button>
					</router-link>
					<div v-if="usersStore.user !== null">
						Hi, {{ usersStore.user?.firstname }}
					</div>
					<button
						v-if="usersStore.user !== null"
						class="bg-green-900 text-white px-4 py-2 rounded-md"
						@click="usersStore.user = null"
					>
						Log out
					</button>
				</div>
			</div>
		</div>
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
