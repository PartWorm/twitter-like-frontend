<template>
	<div>
		<post
			ref="post"
			:id="id"
			:author="author"
			:timestamp="timestamp"
			:content="content"
			:depth="depth"
			:stick_top="stick_top"
		></post>
		<post-tree
			v-for="child in children" :key="child.id"
			:id="child.id"
			:author="child.author"
			:timestamp="child.timestamp"
			:content="child.content"
			:children="child.children"
			:depth="depth + 1"
			:stick_top="stick_top + height"
		/>
	</div>
</template>

<script lang="ts">

import Post from './Post.vue';

export default {
	name: 'post-tree',
	components: { Post },
	props: {
		id: {},
		author: {},
		timestamp: {},
		content: {},
		children: {},
		depth: {
			default: 0,
		},
		stick_top: {
			default: 0,
		},
	},
	data() {
		return {
			height: 0,
		};
	},
	mounted() {
		this.height = this.$refs.post.height();
	},
};

</script>
