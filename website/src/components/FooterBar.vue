<template>
	<div class="w-full relative h-1/3">
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
		<div
			class="w-full relative bg-dark-blue-efrei text-white py-8 px-2 lg:max-2xl:px-8"
		>
			<!-- Content for all screen sizes -->
			<div class="text-3xl">Efrei Basketball</div>

			<!-- Content for medium and larger screens -->
			<div
				class="grid-flow-col text-white lg:max-2xl:text-lg sm:text-xs md:text-sm my-4 gap-20"
			>
				<p>Le site de ton équipe préférée</p>
				<br />
				<p>slslskdjbsk</p>
				<br />
				<p>shjss</p>
				<div class="button-container flex-row flex-wrap mt-4">
					<a href="https://www.instagram.com/efrei_basket">
						<div class="glass-btn instagram-btn">
							<!--<div class="content">
      							@efrei_basket
    						</div> -->

							<img
								src="../assets/img/logos/instagram.svg"
								alt="instagram"
								class="btn-logo"
							/>
						</div>
					</a>

					<a href="https://discord.gg/nAjQkcNG6V">
						<div class="glass-btn discord-btn">
							<!--<div class="content">e</div>-->
							<img
								src="../assets/img/logos/discord.svg"
								alt="discord"
								class="btn-logo"
							/>
						</div>
					</a>

					<a href="https://www.linkedin.com/company/efrei-basket">
						<div class="glass-btn linkedin-btn">
							<!-- <div class="content">
      								efrei-basket
    							</div> -->

							<img
								src="../assets/img/logos/linkedin.svg"
								alt="linkedin"
								class="btn-logo"
							/>
						</div>
					</a>

					<a href="https://www.tiktok.com/@efreibasket">
						<div class="glass-btn tiktok-btn">
							<!-- <div class="content">
      							@efreibasket
    						</div> -->

							<img
								src="../assets/img/logos/tiktok.svg"
								alt="tiktok"
								class="tiktok-logo"
							/>
						</div>
					</a>

					<a href="mailto:basketball@bds-efrei.fr">
						<div class="glass-btn email-btn">
							<!-- <div class="content">
      							basketball@bds-efrei.fr
    						</div> -->

							<img
								src="../assets/img/logos/email.svg"
								alt="email"
								class="btn-logo"
							/>
						</div>
					</a>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss"></style>
