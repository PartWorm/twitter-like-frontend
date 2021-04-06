import { createRouter, createWebHistory } from 'vue-router';
import TagHome from '@/components/TagHome.vue';

const routes = [
	{ path: '/', component: TagHome },
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;