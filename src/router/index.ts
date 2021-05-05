import PostPage from '@/routes/PostPage.vue';
import TagHome from '@/routes/TagHome.vue';
import Vue from 'vue';
import VueRouter from 'vue-router';

const routes = [
	{ path: '/', component: TagHome },
	{ path: '/tag/:tag', component: TagHome, props: true },
	{ path: '/post/:id', component: PostPage, props: true },
];

Vue.use(VueRouter);

const router = new VueRouter({
	mode: 'history',
	routes,
});

export default router;
