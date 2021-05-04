<template>
	<router-link :to="`/post/${id}`">
		<div class="post" v-ripple :style="{ top: Math.floor(stick_top) + 'px', zIndex: 100 - depth.toFixed(2) }">
			<div class="indent" v-for="i in depth" :key="i"></div>
			<div class="post-main">
				<div class="post-head">
					<span>{{author}} · {{timestamp}}</span>
				</div>
				<div class="post-body">{{content}}</div>
			</div>
			<div class="border border-bottom" v-if="true || depth == 0"></div>
		</div>
	</router-link>
</template>

<style>

.post {
	position: sticky;
	display: flex;
	flex-direction: row;
	padding: 8px 12px;
	background: white;
}

.post-head {
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
		depth: {
			default: 0,
		},
		stick_top: {},
	},
};

</script>
