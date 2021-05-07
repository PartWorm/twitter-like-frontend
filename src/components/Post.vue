<template>
	<router-link :to="`/post/${data.id}`">
		<div
			:class="claSs" v-ripple :style="style"
		>
			<div style="opacity: 0;">
				<div class="meta header">
					<span class="anonymous-name" :style="{ color: name_color }">{{name}}</span>
					<span class="header-entry"> · {{data.timestamp}}</span>
				</div>
				<div class="body">{{data.content}}</div>
				<div v-if="data.n_children > 0" class="meta footer">
					<div class="footer-entry">
						<img class="footer-icon" src="@/assets/chat_black_24dp.svg">{{data.n_descendants}}
					</div>
					<div class="footer-entry">
						<img class="footer-icon" src="@/assets/reply_black_24dp.svg">{{data.n_children}}
					</div>
				</div>
			</div>
			<div ref="box" class="collapsed-form">
				<span class="anonymous-name" :style="{ color: name_color }">{{name.slice(0, 2)}}</span>
				<span class="body">{{data.content}}</span>
			</div>
		</div>
	</router-link>
</template>

<style scoped>

.post {
	position: relative;
	display: flex;
	flex-direction: column;
	padding: 8px 12px;
	background: white;
}

.sticky {
	position: sticky;
}

.main {
	font-size: 1.1em;
	border: 2px gold solid;
	border-radius: 4px;
}

.meta {
	display: flex;
	flex-direction: row;
	font-size: 0.9em;
	font-weight: 500;
	color: gray;
}

.header {
	align-items: baseline;
}

.header-entry {
	white-space: pre;
}

.footer-entry {
	display: flex;
	flex-direction: row;
	margin-right: 8px;
}

.footer-icon {
	width: 18px;
	margin-right: 4px;
	filter: invert(52%) sepia(0%) saturate(0%) hue-rotate(222deg) brightness(96%) contrast(95%);
}

.anonymous-name {
	font-family: 'Roboto Mono', monospace;
	font-weight: 500;
}

.body {
	color: black;
}

.collapsed-form {
	position: absolute;
	bottom: 0;
	display: flex;
	align-items: baseline;
	flex-direction: row;
}

</style>

<script lang="ts">

import Vue from 'vue';

export default Vue.extend({
	props: {
		data: {},
		sticky: {
			default: true,
		},
		depth: {
			default: 0,
		},
		stick_top: {
			default: 0,
		},
		main: {
			default: false,
		},
	},
	data() {
		return {
			name: Math.floor(Math.random() * (1 << 24)).toString(16).padStart(6, '0'),
		};
	},
	computed: {
		claSs(): string {
			return this.main ? 'post sticky main' : this.sticky ? 'post sticky' : 'post';
		},
		style(): Record<string, unknown> {
			return this.main || this.sticky ? { top: this.stick_top + 'px', zIndex: this.main ? 11 : 10 - this.depth } : {};
		},
		name_color(): string {
			const name = this.name;
			const x = parseInt(name.slice(0, 3), 16) / 0x1000;
			const y = parseInt(name.slice(3, 6), 16) / 0x1000;
			let hue, sat;
			if (y < x && y != 0) {
				hue = x / y / 2;
				sat = y;
			}
			else if (y >= x && y != 1) {
				hue = x / (1 - y) / 2 + 0.5;
				sat = 1 - y;
			}
			else {
				hue = sat = 0;
			}
			sat = Math.pow(sat, 1 / 2.2);
			return `hsl(${Math.floor(hue * 360)}, ${Math.floor(sat * 100)}%, 40%)`;
		},
	},
	methods: {
		height() {
			return (this.$refs.box as Element).clientHeight;
		},
	},
});

</script>
