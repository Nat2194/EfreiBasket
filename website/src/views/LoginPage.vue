<template>
	<div class="w-screen h-screen flex items-center justify-center">
		<div class="flex flex-col gap-8 border rounded-md p-8">
			<div class="text-2xl font-semibold">Log in</div>
			<div class="flex flex-col gap-4">
				<InputBase
					v-model="email"
					placeholder="Email"
					class="w-96 p-4"
					type="email"
				/>
				<InputBase
					v-model="password"
					placeholder="Password"
					class="w-96 p-4"
					type="password"
				/>
				<div class="text-sm text-red-500">{{ msg }}</div>
			</div>

			<button
				class="bg-green-900 w-full text-white px-4 py-2 rounded-md"
				@click="login"
			>
				Login
			</button>

			<div class="flex justify-center items-center text-sm text-gray-500 gap-2">
				<router-link class="" to="/"> Home </router-link>|
				<router-link class="" to="/register"> Register </router-link>
			</div>
		</div>
	</div>
</template>

<script setup>
import InputBase from '@/components/InputBase.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUsersStore } from '../stores/users.store';

const email = ref('');
const password = ref('');
const msg = ref('');

const router = useRouter();
const usersStore = useUsersStore();

const login = async () => {
	msg.value = '';
	if (
		(
			await usersStore.login({
				email: email.value,
				password: password.value,
			})
		).status === 200
	) {
		router.push('/');
	} else {
		msg.value = 'Invalid email or password';
	}
};
</script>
