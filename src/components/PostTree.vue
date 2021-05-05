<template>
	<div style="position: relative;">
		<post
			ref="post"
			v-bind="$props"
		></post>
		<div v-if="data.children" style="display: flex; flex-direction: row;">
			<div class="indent-line"></div>
			<div style="flex-grow: 1;">
				<post-tree
					v-for="child in data.children" :key="child.id"
					:data="child"
					:depth="depth + 1"
					:stick_top="stick_top + height"
				></post-tree>
			</div>
		</div>
		<div v-else-if="data.thread" style="display: flex; flex-direction: row;">
			<div class="indent-line thread-line"></div>
			<div style="flex-grow: 1;">
				<post
					v-for="child in data.thread" :key="child.id"
					:data="child"
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

import Vue from 'vue';
import Post from './Post.vue';

export default Vue.extend({
	name: 'post-tree',
	components: { Post },
	props: {
		data: {},
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
		this.height = Math.floor((this.$refs.post as any).height());
	},
});

</script>
