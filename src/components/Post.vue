<template>
	<router-link :to="`/post/${id}`">
		<div
			ref="bounding_box" :class="main ? 'post sticky main' : sticky ? 'post sticky' : 'post'" v-ripple
			:style="{ top: stick_top + 'px', zIndex: 10 - depth }"
		>
			<div class="post-head">{{author}} · {{timestamp}}</div>
			<div class="post-body">{{content}}</div>
			<div v-if="n_children > 0" class="post-footer">답글 {{n_children}} · 대화 {{n_descendants}}</div>
		</div>
	</router-link>
</template>

<style>

.post {
	display: flex;
	flex-direction: column;
	padding: 8px 12px;
	background: white;
}

.post.sticky {
	position: sticky;
}

.post.main {
	font-size: 1.1em;
	background: #e7f5fe;
}

.post-head, .post-footer {
	font-size: 0.9em;
	font-weight: 500;
	color: gray;
}

.post-body {
	color: black;
}

.indent {
	display: inline-block;
	width: 24px;
}

</style>

<script lang="ts">

export default {
	props: {
		id: {},
		author: {},
		timestamp: {},
		content: {},
		n_children: {},
		n_descendants: {},
		sticky: {
			default: true,
		},
		depth: {
			default: 0,
		},
		stick_top: {},
		main: {
			default: false,
		},
	},
	methods: {
		height() {
			return this.$refs.bounding_box.clientHeight;
		},
	},
};

</script>
