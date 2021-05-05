<template>
	<div style="position: relative;">
		<post
			ref="post"
			:id="id"
			:author="author"
			:timestamp="timestamp"
			:content="content"
			:n_children="n_children"
			:n_descendants="n_descendants"
			:depth="depth"
			:stick_top="stick_top"
			:main="main"
		></post>
		<div v-if="children" style="display: flex; flex-direction: row;">
			<div class="indent-line"></div>
			<div style="flex-grow: 1;">
				<post-tree
					v-for="child in children" :key="child.id"
					:id="child.id"
					:author="child.author"
					:timestamp="child.timestamp"
					:content="child.content"
					:children="child.children"
					:thread="child.thread"
					:n_children="child.n_children"
					:n_descendants="child.n_descendants"
					:depth="depth + 1"
					:stick_top="stick_top + height"
				></post-tree>
			</div>
		</div>
		<div v-else-if="thread" style="display: flex; flex-direction: row;">
			<div class="indent-line thread-line"></div>
			<div style="flex-grow: 1;">
				<post
					v-for="child in thread" :key="child.id"
					:id="child.id"
					:author="child.author"
					:timestamp="child.timestamp"
					:content="child.content"
					:n_children="child.n_children"
					:n_descendants="child.n_descendants"
					:depth="depth + 1"
					:stick_top="stick_top + height"
					:sticky="false"
				></post>
			</div>
		</div>
		<div class="border border-bottom" v-if="depth == 0"></div>
	</div>
</template>

<style>

.indent-line {
	flex-grow: 0;
	width: 4px;
	margin: 4px 4px 4px 12px;
	background: rgba(0, 0, 0, 0.1);
	border-radius: 2px;
}

.thread-line {
	background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.6) 48px, rgba(0, 0, 0, 0.6));
}

</style>

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
		thread: {},
		n_children: {},
		n_descendants: {},
		depth: {
			default: 0,
		},
		stick_top: {
			default: 0,
		},
		main: {
			default: false,
		},
	},
	data() {
		return {
			height: 0,
		};
	},
	mounted() {
		this.height = Math.floor(this.$refs.post.height());
	},
};

</script>
