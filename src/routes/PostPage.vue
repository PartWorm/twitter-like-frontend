<template>
	<div v-if="post" style="position: relative; height: 100%;">
		<post
			v-for="ancestor in post.ancestors" :key="ancestor.id"
			:data="ancestor"
			:sticky="false"
		></post>
		<post
			ref="post"
			:data="post"
			:main="true"
			:sticky="true"
		></post>
		<v-chip-group v-model="sort_by_i" mandatory style="padding: 0 8px;">
			<v-chip filter v-for="sort_by in SortByValues" :key="sort_by.key">{{sort_by.display_name}}</v-chip>
		</v-chip-group>
		<post-tree
			v-for="child in post.children" :key="child.id"
			:post="child"
			:stick_top="height"
		></post-tree>
		<div style="height: 150px; display: flex; justify-content: center; align-items: start;">
			<img class="blueberry" src="/static/blueberry-mutated.png">
		</div>
	</div>
</template>

<script lang="ts">

import Vue from 'vue';
import Post from '../components/Post.vue';
import PostTree from '../components/PostTree.vue';
import { SortBy, SortByValues } from '../sort-by';
import { api_post } from '../api_endpoints';

export default Vue.extend({
	props: ['id'],
	components: { PostTree, Post },
	data() {
		return {
			SortBy,
			SortByValues,
			sort_by_i: SortByValues.indexOf(SortBy.Hot),
			post: undefined as (any | undefined),
			height: 0,
		};
	},
	computed: {
		sort_by(): SortBy {
			return SortByValues[this.sort_by_i];
		},
	},
	watch: {
		sort_by() {
			this.update(this.id);
		},
	},
	methods: {
		async update(id: string) {
			const sort_by = this.sort_by.key;
			const result = await (await fetch(api_post(id, sort_by))).json();
			result.ancestors.reverse();
			this.post = result;
			this.$nextTick(() => {
				this.height = Math.floor((this.$refs.post as any).height());
			});
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
