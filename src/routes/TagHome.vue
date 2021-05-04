<template>
	<div style="position: relative; height: 100%;">
		<div style="position: relative;">
			<v-chip-group style="padding-left: 8px; padding-right: 8px;">
				<v-chip to="/">#전체</v-chip>
				<v-chip v-for="tag in tags" :key="tag" :to="`/tag/${tag}`">
					#{{tag}}
				</v-chip>
			</v-chip-group>
			<div class="border border-bottom"></div>
		</div>
		<div class="title" style="position: relative;">
			#{{tag.length > 0 ? tag : '전체'}}
			<div class="border border-bottom"></div>
		</div>
		<home-post-list :key="this.$route.path" :tag="tag"></home-post-list>
		<div style="height: 100%; display: flex; justify-content: center; align-items: start;">
			<img class="blueberry" src="/static/blueberry-mutated.png">
		</div>
	</div>
</template>

<style>

.title {
	padding: 8px 12px;
	font-size: 1.5em;
}

.blueberry {
	margin-top: 50px;
	width: 50px;
	max-width: 100%;
}

</style>

<script lang="ts">

import HomePostList from "../components/HomePostList.vue";

export default {
	name: 'tag-home',
	components: { HomePostList },
	props: {
		tag: {
			default: '',
		},
	},
	data() {
		return {
			tags: [],
		};
	},
	async created() {
		const data = await (await fetch('/api/tags.php')).json();
		this.tags = data;
	},
};

</script>
