<template>
	<div>
		<div style="position: relative;">
			<v-chip-group style="padding: 0 8px;">
				<v-chip to="/">#전체</v-chip>
				<v-chip v-for="tag in tags" :key="tag" :to="`/tag/${tag}`">
					#{{tag}}
				</v-chip>
			</v-chip-group>
			<div class="border border-bottom"></div>
		</div>
		<div class="title">
			<div>#{{tag.length > 0 ? tag : '전체'}}</div>
			<div style="flex-grow: 1;"></div>
			<v-chip-group
				v-model="sort_by_i"
			>
				<v-chip filter v-for="sort_by in SortByValues" :key="sort_by.key">{{sort_by.display_name}}</v-chip>
			</v-chip-group>
			<div class="border border-bottom"></div>
		</div>
		<home-post-list :key="tag" :tag="tag"></home-post-list>
		<div style="height: 150px; display: flex; justify-content: center; align-items: start;">
			<img class="blueberry" src="/static/blueberry-mutated.png">
		</div>
	</div>
</template>

<style>

.title {
	display: flex;
	flex-direction: row;
	align-items: center;
	position: relative;
	padding-left: 12px;
	font-size: 1.5em;
}

</style>

<script lang="ts">

import Vue from 'vue';
import HomePostList from '../components/HomePostList.vue';
import { SortBy, SortByValues } from '../sort-by';

export default Vue.extend({
	name: 'tag-home',
	components: { HomePostList },
	props: {
		tag: {
			default: '',
		},
	},
	data() {
		return {
			SortBy,
			SortByValues,
			sort_by_i: SortByValues.indexOf(SortBy.Hot),
			tags: [],
			my_name: '',
		};
	},
	async created() {
		const data = await (await fetch('/api/tags.php')).json();
		this.tags = data;
		{
			const data = await fetch('/api/name.php');
			this.my_name = await data.text();
		}
	},
});

</script>
