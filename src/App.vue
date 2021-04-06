<template>
	<v-app>
		<v-main>
			<router-view />
		</v-main>
	</v-app>
</template>

<script>

import { RouterView } from 'vue-router';

export default {
	name: 'App',
	components: {
		RouterView,
	},
	data: () => ({
	}),
};

</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

* {
	font-family: 'Roboto', sans-serif;
}

</style>
