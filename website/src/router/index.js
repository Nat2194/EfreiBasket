import HomePage from '@/views/HomePage.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
	{
		path: '/',
		name: 'Home',
		component: HomePage,
	},
	{
		path: '/schedule',
		name: 'Schedule',
		component: () => import('@/views/SchedulePage.vue'),
	},
	{
		path: '/planning',
		name: 'Planning',
		component: () => import('@/views/PlanningPage.vue'),
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import('@/views/LoginPage.vue'),
	},
	{
		path: '/register',
		name: 'Register',
		component: () => import('@/views/RegisterPage.vue'),
	},
];

export default createRouter({
	history: createWebHistory(),
	routes,
});
