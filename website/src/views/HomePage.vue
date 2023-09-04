<template>
	<LayoutBase>
		<div class="flex flex-col gap-4">
			<!-- Render different images based on screen size -->
			<SliderBase
				:img-list="
					isMobileScreen ? mobileSliderImages : desktopSliderImages
				"
			/>
		</div>
	</LayoutBase>
</template>

<script setup>
import LayoutBase from '@/components/LayoutBase.vue';
import SliderBase from '@/components/SliderBase.vue';

// Import slider images for desktop
import sliderImg1 from '@/assets/img/slider/horizontal/1.jpg';
import sliderImg2 from '@/assets/img/slider/horizontal/2.jpg';
import sliderImg3 from '@/assets/img/slider/horizontal/3.jpg';
import sliderImg4 from '@/assets/img/slider/horizontal/4.jpg';
import sliderImg5 from '@/assets/img/slider/horizontal/5.jpg';
import sliderImg6 from '@/assets/img/slider/horizontal/6.jpg';
import sliderImg7 from '@/assets/img/slider/horizontal/7.jpg';

// Import slider images for mobile
import mobileImg1 from '@/assets/img/slider/vertical/1.jpg';
import mobileImg2 from '@/assets/img/slider/vertical/2.jpg';
import mobileImg3 from '@/assets/img/slider/vertical/3.jpg';
import mobileImg4 from '@/assets/img/slider/vertical/4.jpg';
import mobileImg5 from '@/assets/img/slider/vertical/5.jpg';

// Define two sets of images: one for mobile and one for desktop
const mobileSliderImages = [
	mobileImg1,
	mobileImg2,
	mobileImg3,
	mobileImg4,
	mobileImg5,
	// Add mobile-specific images here
];

const desktopSliderImages = [
	sliderImg1,
	sliderImg2,
	sliderImg3,
	sliderImg4,
	sliderImg5,
	sliderImg6,
	sliderImg7,
	// Add desktop-specific images here
];

// Check if the screen width is less than or equal to the mobile breakpoint (e.g., 640px).
const isMobileScreen = window.innerWidth <= 640; // Adjust the breakpoint as needed
</script>
