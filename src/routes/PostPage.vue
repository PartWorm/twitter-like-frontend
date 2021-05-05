<template>
	<div v-if="post" style="position: relative; height: 100%;">
		<post
			v-for="ancestor in post.ancestors" :key="ancestor.id"
			:data="ancestor"
		></post>
		<post-tree
			:data="post"
			:main="true"
		></post-tree>
		<div style="height: 100%; display: flex; justify-content: center; align-items: start;">
			<img class="blueberry" src="/static/blueberry-mutated.png">
		</div>
	</div>
</template>

<script lang="ts">

import Vue from 'vue';
import Post from '../components/Post.vue';
import PostTree from '../components/PostTree.vue';

export default Vue.extend({
	props: ['id'],
	components: { PostTree, Post },
	data() {
		return {
			post: undefined as (any | undefined),
		};
	},
	methods: {
		async update(id: string) {
			const result = await (await fetch(`/api/post.php?id=${id}`)).json();
			result.ancestors.reverse();
			this.post = result;
		},
	},
	created() {
		this.update(this.id);
	},
	...{
		beforeRouteUpdate(to: any, from: any, next: any) {
			next();
			this.update(to.params.id);
		},
	},
});

</script>
