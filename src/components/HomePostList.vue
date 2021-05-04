<template>
	<div>
		<post-tree
			v-for="post in posts" :key="post.id"
			v-bind="post"
		></post-tree>
	</div>
</template>

<style>

</style>

<script lang="ts">

import PostTree from './PostTree.vue';

export default {
	props: ['tag'],
	components: { PostTree },
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
}

</script>
