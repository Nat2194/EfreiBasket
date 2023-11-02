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
		path: '/accounts',
		name: 'Accounts',
		component: () => import('@/views/Admin/AccountsManagementPage.vue'),
	},
	{
		path: '/roles',
		name: 'Roles',
		component: () => import('@/views/Admin/RolesManagementPage.vue'),
	},
];

export default createRouter({
	history: createWebHistory(),
	routes,
});
