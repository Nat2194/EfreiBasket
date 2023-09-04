<template>
	<div class="w-full relative">
		<!-- Wave Animation -->
		<svg
			class="editorial"
			xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink"
			viewBox="0 24 150 28 "
			preserveAspectRatio="none"
		>
			<defs>
				<path
					id="gentle-wave"
					d="M-160 44c30 0 
    58-18 88-18s
    58 18 88 18 
    58-18 88-18 
    58 18 88 18
    v44h-352z"
				/>
			</defs>
			<g class="parallax1">
				<use xlink:href="#gentle-wave" x="50" y="3" fill="#C6CCEE" />
			</g>
			<g class="parallax2">
				<use xlink:href="#gentle-wave" x="50" y="0" fill="#556297" />
			</g>
			<g class="parallax3">
				<use xlink:href="#gentle-wave" x="50" y="9" fill="#377fbc" />
			</g>
			<g class="parallax4">
				<use xlink:href="#gentle-wave" x="50" y="6" fill="#232C53" />
			</g>
		</svg>
		<div class="w-full relative bg-dark-blue-efrei text-white p-8">
			<!-- Content for all screen sizes -->
			<div class="text-3xl">Efrei Basketball</div>

			<!-- Content for medium and larger screens -->
			<div
				class="hidden lg:max-2xl:grid lg:max-2xl:grid-flow-col text-white text-sm my-4 gap-20"
			>
				Le site de ton équipe préférée
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss"></style>
