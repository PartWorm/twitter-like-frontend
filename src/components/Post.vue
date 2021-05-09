<template>
	<router-link :to="`/post/${data.id}`">
		<div
			ref="full_box" :class="claSs" v-ripple :style="style"
		>
			<div style="flex-grow: 1;">
				<div :style="{ opacity: `${collapsed ? 0 : 100}%` }">
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
				<div :style="{ opacity: `${collapsed ? 100 : 0}%` }" ref="collapsed_box" class="collapsed-form">
					<span class="anonymous-name" :style="{ color: name_color }">{{name.slice(0, 2)}}⋯</span>
					<span class="body collapsed-body">{{data.content}}</span>
				</div>
			</div>
			<v-btn style="align-self: flex-end;" icon><img class="reply-button" src="@/assets/reply_black_24dp.svg"></v-btn>
		</div>
	</router-link>
</template>

<style scoped>

.post {
	position: relative;
	display: flex;
	flex-direction: row;
	padding: 8px 12px;
	background: white;
}

.sticky {
	position: sticky;
}

.main {
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
	align-items: center;
	margin-right: 8px;
}

.footer-icon {
	width: 18px;
	margin-right: 4px;
	filter: invert(52%) sepia(0%) saturate(0%) hue-rotate(222deg) brightness(96%) contrast(95%);
}

.reply-button {
	filter: invert(52%) sepia(0%) saturate(0%) hue-rotate(222deg) brightness(96%) contrast(95%);
}

.anonymous-name {
	font-family: 'Roboto Mono', monospace;
	font-weight: 500;
}

.body {
	margin-bottom: 2px;
	line-height: normal;
	color: black;
}

.collapsed-form {
	position: absolute;
	width: 100%;
	left: 0;
	bottom: 0;
	display: flex;
	align-items: baseline;
	flex-direction: row;
	padding: inherit;
}

.collapsed-body {
	margin-left: 8px;
	text-overflow: ellipsis;
	overflow: hidden;
}

</style>

<script lang="ts">

import Vue from 'vue';

import { color_from_name } from '../color_from_name';

export default Vue.extend({
	props: {
		data: {},
		sticky: {
			default: false,
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
			height_diff: 0,
			collapsed: false,
		};
	},
	computed: {
		claSs(): string {
			return this.main ? 'post sticky main' : this.sticky ? 'post sticky' : 'post';
		},
		style(): Record<string, unknown> {
			return this.sticky ? { top: this.stick_top - this.height_diff + 'px', zIndex: this.main ? 11 : 10 - this.depth } : {};
		},
		name_color(): string {
			return color_from_name(this.name);
		},
	},
	mounted() {
		const { collapsed_box, full_box } = this.$refs;
		this.height_diff = Math.ceil((full_box as Element).clientHeight - (collapsed_box as Element).clientHeight);
	},
	methods: {
		height() {
			return (this.$refs.collapsed_box as Element).clientHeight;
		},
	},
});

</script>
