<template>
	<div>
		<post
			v-for="post in posts" :key="post.id"
			:data="post"
		></post>
	</div>
</template>

<style>

</style>

<script lang="ts">

import Vue from 'vue';
import Post from './Post.vue';

export default Vue.extend({
	props: ['tag'],
	components: { Post },
	data() {
		return {
			posts: [],
		};
	},
	async created() {
		const { tag } = this;
		const request_url = tag.length > 0 ? `/api/home-posts.php?tag=${tag}` : '/api/home-posts.php';
		const result = await (await fetch(request_url)).json();
		this.posts = result;
	},
});

</script>
