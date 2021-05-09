<template>
	<div style="position: relative;">
		<post
			ref="post"
			:data="post"
			:depth="depth"
			:stick_top="stick_top"
			:sticky="sticky"
		></post>
		<div v-if="has_children || has_thread" class="shadow" :style="{ zIndex: 10 - depth, top: stick_top + height + 'px' }"></div>
		<div v-if="has_children" style="display: flex; flex-direction: row;">
			<div class="indent-line"></div>
			<div style="flex-grow: 1;">
				<post-tree
					v-for="child in post.children" :key="child.id"
					:post="child"
					:depth="depth + 1"
					:stick_top="stick_top + height"
				></post-tree>
			</div>
		</div>
		<div v-else-if="has_thread" style="display: flex; flex-direction: row;">
			<div class="indent-line thread-line"></div>
			<div style="flex-grow: 1;">
				<post
					v-for="child in post.thread" :key="child.id"
					:data="child"
					:sticky="false"
				></post>
			</div>
		</div>
		<div class="border border-bottom" v-if="depth == 0" :style="{ zIndex: 10 - depth }"></div>
	</div>
</template>

<style>

.indent-line {
	flex-shrink: 0;
	width: 4px;
	margin: 4px 4px 4px 12px;
	background: rgba(0, 0, 0, 0.1);
	border-radius: 2px;
}

.thread-line {
	background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.6) 48px, rgba(0, 0, 0, 0.6));
}

.shadow {
	position: sticky;
	width: 100%;
	height: 8px;
	margin-bottom: -8px;
	background: linear-gradient(rgba(255, 255, 255, 255), rgba(255, 255, 255, 0));
}

</style>

<script lang="ts">

import Vue from 'vue';
import Post from './Post.vue';

export default Vue.extend({
	name: 'post-tree',
	components: { Post },
	props: {
		post: {},
		depth: {
			default: 0,
		},
		stick_top: {
			default: 0,
		},
	},
	computed: {
		has_children(): boolean {
			return (this as any).post.children?.length;
		},
		has_thread(): boolean {
			return (this as any).post.thread?.length;
		},
		sticky(): boolean {
			return this.has_children || this.has_thread;
		},
	},
	data() {
		return {
			height: 0,
		};
	},
	mounted() {
		this.height = Math.floor((this.$refs.post as any).height());
	},
});

</script>
