<template>
	<div class="post" v-for="post in posts" :key="post.id">
		{{post.author}}: {{post.content}}
	</div>
</template>

<script lang="ts">

export default {
	data() {
		return {
			posts: [],
		};
	},
	async created() {
		const result = await (await fetch('/api/posts.php')).json();
		this.posts = result;
	},
}

</script>