<template>
	<LayoutBase>
		<div class="bg-gray-100 min-h-screen flex items-center justify-center">
			<div class="bg-white p-8 rounded-lg shadow-md w-96">
				<h1 class="text-2xl font-semibold mb-4">
					Page en Développement
				</h1>

				<p class="text-gray-600 mb-6">
					Cette page est en cours de développement. Nous travaillons
					dur pour vous apporter de nouvelles fonctionnalités
					passionnantes. Revenez bientôt !
				</p>

				<div class="flex justify-end">
					<router-link to="/">
						<button
							class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
						>
							Retour
						</button>
					</router-link>
				</div>
			</div>
		</div>
	</LayoutBase>
</template>

<script setup>
import LayoutBase from '@/components/LayoutBase.vue';
</script>
