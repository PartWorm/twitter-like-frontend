<template>
	<v-btn>Test</v-btn>
	<v-chip-group>
		<v-chip v-for="tag in tags" :key="tag">
			{{tag}}
		</v-chip>
	</v-chip-group>
	<post-list />
</template>

<script lang="ts">

import PostList from './PostList.vue';

export default {
	components: { PostList },
	data() {
		return {
			tags: [1, 2, 3],
		};
	},
	async created() {
		const data = await (await fetch('/api/tags.php')).json();
		this.tags = data;
	},
};

</script>