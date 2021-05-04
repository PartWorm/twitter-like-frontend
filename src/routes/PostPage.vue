<template>
	<div v-if="post" style="position: relative; height: 100%;">
		<post
			v-for="ancestor in post.ancestors" :key="ancestor.id"
			:id="ancestor.id"
			:author="ancestor.author"
			:timestamp="ancestor.timestamp"
			:content="ancestor.content"
		></post>
		<post-tree
			:id="post.id"
			:author="post.author"
			:timestamp="post.timestamp"
			:content="post.content"
			:children="post.children"
		></post-tree>
		<div style="height: 100%; display: flex; justify-content: center; align-items: start;">
			<img class="blueberry" src="/static/blueberry-mutated.png">
		</div>
	</div>
</template>

<script lang="ts">

import Post from '../components/Post.vue';
import PostTree from '../components/PostTree.vue';

export default {
	props: ['id'],
	components: { PostTree, Post },
	data() {
		return {
			post: undefined,
		};
	},
	methods: {
		async update(id) {
			const result = await (await fetch(`/api/post.php?id=${id}`)).json();
			result.ancestors.reverse();
			this.post = result;
		}
	},
	created() {
		this.update(this.id);
	},
	beforeRouteUpdate(to, from, next) {
		next();
		this.update(to.params.id);
	},
};

</script>
