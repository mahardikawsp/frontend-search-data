<script setup>
import Navbar from './components/Navbar.vue';
import Header from './components/Header.vue';
import Filters from './components/Filters.vue';
import Search from './components/icons/Search.vue';
import Star from './components/icons/Star.vue';
import { computed, onMounted, watch, watchEffect } from '@vue/runtime-core';
import { useSearchStore } from './stores/search';
import { useUrusanStore } from './stores/urusan';
import LoadingAnimation from './components/LoadingAnimation.vue';

const { fetchSearch, results, resetFilter, filter } = useSearchStore();
const { fetchUrusan, urusan } = useUrusanStore();
onMounted(() => {
  resetFilter();
  fetchSearch();
});

function setPage(page) {
  filter.page = page;
}

const pageFilter = computed(() => filter.page);
watch(pageFilter, (v) => {
  fetchSearch();
});
</script>

<template lang="pug">
Navbar 
Header
Filters

.section-docs
	.container 
		div(v-if="results.isLoading")
			LoadingAnimation
		div(v-else-if="results.errors")
			.empty-state
					span Terjadi kesalahan
		div(v-else)
			div(v-if="results.items?.length")
				.main-docs
					a.docs(v-for="item in results.items" :href="item.url")
						figure.docs__icon: img(src="/images/docs.png")
						.docs__meta
							h2.docs__title {{ item.nama_data }}
							ul.docs__badges
								li.badge
									Star
									span {{ item.kategori}}
								li.badge
									span {{ item.urusan}}
								li.badge
									span {{ item.source}}
						.docs__cta
							span Preview
							Search
					.result-count
						span Menampilkan {{ results.items?.length }} dari {{results.total}} hasil pencarian
					nav.pagination
						<button class="pagination__link" v-if="results.currentPage !== 1" @click.prevent="setPage(results.currentPage - 1)">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:20px;height:20px;">
								<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
							</svg>
						</button>
						<div v-for="page in results.totalPage < 6 ? results.totalPage : 5" :key="page">
							<button v-if="page + results.currentPage - 1 <= results.totalPage" class="pagination__link" :class="{'pagination__link--active': results.currentPage ==  page + results.currentPage - 1}" @click.prevent="setPage(page + results.currentPage - 1)">{{ page + results.currentPage - 1 }}</button>
						</div>
						<button class="pagination__link" v-if="results.currentPage !== results.totalPage" @click.prevent="setPage(results.currentPage + 1)">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:20px;height:20px;">
								<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
							</svg>
						</button>
						//- button.pagination__link.pagination__link(@click.prevent="setPage()", v-for="page in results.totalPage < 6 ? results.totalPage : 5", :key="page") {{ page }}
			.empty-state(v-else)
				span Hasil tidak ditemukan

</template>

<style lang="sass">
.container
	padding: 0
.empty-state
	padding: 40px 0
	text-align: center
.error-state
	padding: 40px 0
	text-align: center
.result-count
	text-align: center
	padding: 10px 0

.section-docs
	padding: 40px 0px 80px
.main-docs
	display: flex
	flex-direction: column
	gap: 32px
	padding: 40px 0px


.docs
	display: flex
	align-items: center
	justify-content: center
	gap: 40px
	padding: 20px
	border: 1px solid rgba(0,0,0,.125)
	background-color: #fff
	border-radius: 4px
	box-shadow: 0 6px 10px rgb(0 0 0 / 8%), 0 0 6px rgb(0 0 0 / 5%)
	transition: .3s transform cubic-bezier(.155,1.105,.295,1.12), .3s box-shadow
	&__icon
		flex: 0 0 80px
		img
			width: 100%
	&__meta
		flex-grow: 1
		display: flex
		flex-direction: column
		gap: 8px

	&__title
		font-size: 16px
		font-weight: 700
		text-transform: capitalize
		margin-bottom: 0
		color: var(--dark)

	&__badges
		padding: 0
		margin: 0
		display: flex
		align-items: center
		gap: 8px
		list-style: none

	&__cta
		display: flex
		align-items: center
		justify-content: center
		border-radius: 100px
		color: var(--dark)
		border: 1px solid var(--border)
		padding: 8px 24px 8px 32px
		gap: 12px
		margin-right: 40px
		position: relative
		overflow: hidden
		&::before
			content: ''
			position: absolute
			width: 100%
			height: 100%
			top: 0
			right: 0
			bottom: 0
			left: 0
			z-index: 1
			background: linear-gradient(90deg, rgba(30,85,189,1) 0%, rgba(67,126,235,1) 100%)
			transition: all 0.3s ease-in-out
			opacity: 0
		svg
			width: 16px

		span,
		svg
			position: relative
			z-index: 2

		&:hover
			color: #fff
			&::before
				opacity: 1


	&:hover
		transform: scale(1.05)
		box-shadow: 0 10px 20px rgb(0 0 0 / 12%), 0 4px 8px rgb(0 0 0 / 6%)


.badge
	display: flex
	align-items: center
	justify-content: center
	border: 1px solid var(--border)
	padding: 4px 12px
	font-size: 12px
	font-weight: 700
	color: var(--dark)
	gap: 8px
	svg
		width: 14px


.pagination
	display: flex
	align-items: center
	justify-content: center
	gap: 12px
	&__link
		width: 44px
		height: 44px
		display: flex
		align-items: center
		justify-content: center
		border: 1px solid var(--border)
		color: var(--dark)
		border-radius: 8px
		&:hover
			border-color: var(--primary)
			color: var(--primary)

		&--active
			color: #ffffff
			background-color: var(--primary)
			border-color: var(--primary)
			&:hover
				color: #ffffff
</style>
