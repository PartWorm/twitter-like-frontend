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
import { api_home_posts, api_home_posts_with_tag } from '../api_endpoints';
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
		const request_url = tag.length > 0 ? api_home_posts_with_tag(tag) : api_home_posts;
		const result = await (await fetch(request_url)).json();
		this.posts = result;
	},
});

</script>
