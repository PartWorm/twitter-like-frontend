<template>
	<div class="tag" v-for="tag in tags" :key="tag">
		{{tag}}
	</div>
</template>

<script lang="ts">

export default {
	props: ['tags'],
};

</script>

<style>

.tag {
	display: inline-block;
	padding: 8px;
	margin-right: 8px;
	border: 1px black solid;
}

.tag::before {
	content: '#';
}

</style>