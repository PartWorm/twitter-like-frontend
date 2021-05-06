<template>
	<div v-if="post" style="position: relative; height: 100%;">
		<v-chip-group v-model="sort_by_i" mandatory style="padding: 0 8px;">
			<v-chip v-for="sort_by in SortByValues" :key="sort_by.key">{{sort_by.display_name}}</v-chip>
		</v-chip-group>
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
import { SortBy, SortByValues } from '../sort-by';

export default Vue.extend({
	props: ['id'],
	components: { PostTree, Post },
	data() {
		return {
			SortBy,
			SortByValues,
			sort_by_i: SortByValues.indexOf(SortBy.Hot),
			post: undefined as (any | undefined),
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
			const result = await (await fetch(`/api/post.php?id=${id}&sort-by=${sort_by}`)).json();
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
