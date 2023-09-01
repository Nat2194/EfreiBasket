<template>
	<LayoutBase>
		<div class="flex flex-col gap-24">
			<div>
				<div class="flex justify-center text-2xl font-bold">
					About StockY
				</div>
				<div class="mt-4">
					<p>
						StockY is a completely unprecedented online marketplace
						and clothing reseller, primarily of NFTs of sneakers
						counterfeits.
					</p>
					<p>
						This company has been founded by Théo Lasnier and Nathan
						Carlier, two awesome businessmen well-known for the
						success of their Mexican restaurant chain start-up
						'Avocado del Diablo' in 2020.
					</p>
					<p>We deny any relation with StockX.</p>
				</div>
			</div>

			<div class="flex flex-col gap-8">
				<div class="flex text-2xl font-bold">Our Sneakers Brands</div>
				<div class="flex flex-col gap-4">
					<div v-for="(brand, i) in clothesBrands" :key="i">
						<div
							class="flex items-center gap-8"
							:class="{
								'flex-row-reverse text-right': i % 2 === 1,
							}"
						>
							<div
								class="h-36 w-36 flex items-center justify-center"
							>
								<img
									:class="{ invisible: !brand.src }"
									:src="brand.src"
									class="object-contain"
								/>
							</div>

							<div class="flex flex-col gap-2">
								<div class="text-2xl font-medium">
									{{ brand.name }}
								</div>
								<div class="">
									{{ brand.description }}
								</div>
							</div>
						</div>
						<hr class="mt-4 w-1/5 mx-auto" />
					</div>
				</div>

				<div class="flex text-2xl font-bold">Our Gaming Brands</div>
				<div class="flex flex-col gap-8">
					<div v-for="(brand, i) in gamingBrands" :key="i">
						<div
							class="flex items-center gap-8"
							:class="{
								'flex-row-reverse text-right': i % 2 === 1,
							}"
						>
							<div
								class="h-36 w-36 flex items-center justify-center"
							>
								<img
									:class="{ invisible: !brand.src }"
									:src="brand.src"
									class="object-contain"
								/>
							</div>

							<div class="flex flex-col gap-2">
								<div class="text-2xl font-medium">
									{{ brand.name }}
								</div>
								<div class="">
									{{ brand.description }}
								</div>
							</div>
						</div>
						<hr class="mt-4 w-1/5 mx-auto" />
					</div>
				</div>
			</div>
		</div>
	</LayoutBase>
</template>

<script setup>
import LayoutBase from '@/components/LayoutBase.vue';
import JordanImg from '@/assets/img/logos/jordan.jpg';
import VansImg from '@/assets/img/logos/vans.jpg';
import YardImg from '@/assets/img/logos/yard.jpg';
import IttaImg from '@/assets/img/logos/itta.jpg';
import MonsombreImg from '@/assets/img/logos/monsombre.jpg';
import KanyeEastImg from '@/assets/img/logos/kanye.jpg';
import YBoxImg from '@/assets/img/logos/ybox.jpg';
import AtariImg from '@/assets/img/logos/attari.png';
import GameBoyImg from '@/assets/img/logos/gameboy.webp';

const clothesBrands = [
	{
		name: 'Ground Jordan',
		description: 'The mythical Air Jordan, but cheaper and better',
		src: JordanImg,
	},
	{
		name: 'Yard',
		description:
			'This brand is like Yeezy but it goes hard. Designed for winners and leaders, not for people who take it easy.',
		src: YardImg,
	},
	{
		name: 'Manuel Vans',
		description: 'Do I really need to explain this one ? Come on.',
		src: VansImg,
	},
	{
		name: 'Itta',
		description: `Did you know that Nike means "Victory" in greek ? Well, Itta means defeat in greek. Yes, it's totally uncool but at least it's cheap. Itta's newest collections like the Ground Min and the Layup pay tribute to the Nike Air Max and Nike Dunk.`,
		src: IttaImg,
	},
	{
		name: 'Wlone',
		description:
			"It's twice as good as Vlone, but twice cheaper (source : trust me).",
	},
	{
		name: 'Monsombre',
		description:
			'Moncler is a bit too bright and gets stained easily. With Monsombre, your clothes will look clean longer.',
		src: MonsombreImg,
	},
	{
		name: 'Kanye East Hoodies',
		description:
			'Kanye West is quite famous so I shouldnt have to explain a pun this obvious. Im ashamed of it to be honest.',
		src: KanyeEastImg,
	},
	{
		name: 'Infime',
		description:
			'Supreme seemed too pretentious so we created Infime for people who lack self-esteem. We think about everyone.',
	},
];

const gamingBrands = [
	{
		name: 'Ybox',
		description: 'The StockY version of Xbox.',
		src: YBoxImg,
	},
	{
		name: 'Atari',
		description: 'Do you really want to purchase an Atari in 2022 ?',
		src: AtariImg,
	},
	{
		name: 'Gameboy',
		description: 'For the nostalgic ones.',
		src: GameBoyImg,
	},
];
</script>
