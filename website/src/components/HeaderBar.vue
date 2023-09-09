<template>
	<div
		class="fixed w-full bg-white z-10 transition-all duration-300 ease-in-out"
		:class="{
			'shadow-md': !isSticky,
			'shadow-2xl': isSticky,
			'h-12': !isSticky,
			'h-18': isSticky,
		}"
	>
		<!-- Mobile Menu Bar -->
		<div
			class="xl:max-2xl:hidden px-4 py-2 bg-dark-blue-efrei flex flex-row justify-between"
		>
			<img
				src="../assets/img/logos/efreibasketlogo.svg"
				class="object-contain lg:h-30 md:h-20 h-10"
			/>
			<DropDownHeader />
		</div>

		<!-- Desktop Navigation -->
		<div
			class="hidden xl:max-2xl:flex xl:max-2xl:flex-row justify-between pl-32 pr-8 bg-dark-blue-efrei transition-all duration-300 ease-in-out"
			:class="{ 'p-2': !isSticky }"
		>
			<router-link
				to="/"
				class="flex items-center gap-2 !text-black logo"
			>
				<img
					src="../assets/img/logos/efreibasketlogo.svg"
					class="object-contain h-20"
				/>
			</router-link>

			<ul class="flex flex-row items-center justify-center">
				<li
					:class="{
						'header-text': !isSticky,
						'header-text-sticky': isSticky,
					}"
				>
					<a
						href="https://drive.google.com/drive/u/1/folders/1ZNng0vXwUQXp3xqbnCKuTW_xXq8B-2Xi"
						>Médias</a
					>
				</li>
				<li
					:class="{
						'header-text': !isSticky,
						'header-text-sticky': isSticky,
					}"
				>
					<router-link to="/schedule">
						<a>Matchs</a>
					</router-link>
				</li>
				<li
					:class="{
						'header-text': !isSticky,
						'header-text-sticky': isSticky,
					}"
				>
					<a>Classement</a>
				</li>
				<li
					:class="{
						'header-text': !isSticky,
						'header-text-sticky': isSticky,
					}"
				>
					<a>Entraînements</a>
				</li>
				<li
					:class="{
						'header-text': !isSticky,
						'header-text-sticky': isSticky,
					}"
				>
					<a>Joueurs</a>
				</li>
				<li
					:class="{
						'header-text': !isSticky,
						'header-text-sticky': isSticky,
					}"
				>
					<a href="https://forms.gle/qytvKtgq35xuB5g58"
						>Inscription</a
					>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import DropDownHeader from './DropDownHeader.vue';

export default {
	components: { DropDownHeader },
	data() {
		return {
			isSticky: false,
			mobileMenuOpen: false,
		};
	},
	mounted() {
		window.addEventListener('scroll', this.handleScroll);
	},
	beforeUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
	},
	methods: {
		handleScroll() {
			if (window.scrollY > 0) {
				this.isSticky = true;
			} else {
				this.isSticky = false;
			}
		},
		toggleMobileMenu() {
			this.mobileMenuOpen = !this.mobileMenuOpen;
		},
	},
};
</script>

<style scoped lang="scss"></style>
