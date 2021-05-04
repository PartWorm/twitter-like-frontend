<template>
	<v-app>
		<v-main style="position: relative;">
			<v-container style="max-width: 500px; padding: 0; height: 100%;">
				<keep-alive include="tag-home">
					<router-view></router-view>
				</keep-alive>
			</v-container>
			<div class="border border-left"></div>
			<div class="border border-right"></div>
		</v-main>
	</v-app>
</template>

<style>

@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

* {
	margin: 0;
	border: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: 'Roboto', sans-serif;
}

a {
	text-decoration: none;
}

.border {
	position: absolute;
	background: rgba(0, 0, 0, 0.1);
}

.border-left {
	width: 1px;
	height: 100%;
	left: 0;
	top: 0;
}

.border-right {
	width: 1px;
	height: 100%;
	right: 0;
	top: 0;
}

.border-bottom {
	width: 100%;
	height: 1px;
	left: 0;
	bottom: 0;
}

</style>

<script>

export default {
	name: 'App',
	components: {
	},
	data() {
		return {
		};
	},
};

</script>