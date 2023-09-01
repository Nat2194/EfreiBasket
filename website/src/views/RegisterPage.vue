<template>
	<div class="w-screen h-screen flex items-center justify-center">
		<form
			class="flex flex-col gap-8 border rounded-md p-8"
			@submit.prevent="register"
		>
			<div class="text-2xl font-semibold">Register</div>
			<div class="flex flex-col gap-4 w-96">
				<div class="flex gap-2 w-full">
					<InputBase
						v-model="firstname"
						placeholder="First Name"
						class="p-4"
						type="text"
						:required="true"
					/>
					<InputBase
						v-model="lastname"
						placeholder="Last Name"
						class="p-4"
						type="text"
						:required="true"
					/>
				</div>
				<InputBase
					v-model="email"
					placeholder="Email"
					class="w-full p-4"
					type="email"
					:required="true"
				/>
				<InputBase
					v-model="phone"
					placeholder="Phone"
					class="w-full p-4"
					type="tel"
					:required="true"
					pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
				/>
				<InputBase
					v-model="password"
					placeholder="Password"
					class="w-full p-4"
					type="password"
					:required="true"
				/>
				<div class="text-red-500 text-sm">{{ msg }}</div>
			</div>

			<button
				class="bg-green-900 w-full text-white px-4 py-2 rounded-md"
				type="submit"
			>
				Register
			</button>
			<div class="flex justify-center items-center text-sm text-gray-500 gap-2">
				<router-link class="" to="/"> Home </router-link>|
				<router-link class="" to="/login"> Log in </router-link>
			</div>
		</form>
	</div>
</template>

<script setup>
import InputBase from '@/components/InputBase.vue';
import { ref } from 'vue';
import { useUsersStore } from '../stores/users.store';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const firstname = ref('');
const lastname = ref('');
const phone = ref('');
const msg = ref('');

const router = useRouter();

const usersStore = useUsersStore();

const register = async () => {
	msg.value = '';

	if (
		(
			await usersStore.register({
				email: email.value,
				password: password.value,
				firstname: firstname.value,
				lastname: lastname.value,
				phone: phone.value,
			})
		).status !== 201
	) {
		msg.value = 'Email or phone already used';
	} else {
		router.push('/login');
	}
};
</script>
