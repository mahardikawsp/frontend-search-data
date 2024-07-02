<script setup>
import Filter from './Filter.vue';
import FilterUrusan from './FilterUrusan.vue';
import FilterSkpd from './FilterSkpd.vue';
import FilterDasarSektoral from './FilterDasarSektoral.vue';
import CaretDown from './icons/CaretDown.vue';
import { useSearchStore } from '../stores/search';
import { computed, watch } from '@vue/runtime-core';

const { filter, fetchSearch } = useSearchStore();

const orderFilter = computed(() => filter.order);
watch(orderFilter, (v) => {
  filter.page = 1;
  fetchSearch();
});
</script>

<template lang="pug">
section.section-filter-area
    .container
        .container-filter
            .filter-area
                .filter-area__item
                    FilterSkpd
                .filter-area__item
                    FilterUrusan
                    //- Filter
                .filter-area__item
                    FilterDasarSektoral
                    //- Filter
        
            .sort-area
                .select-sort
                    select(v-model="filter.order")
                        option(value="") Berdasarkan Relevansi
                        option(value="desc") Diperbarui Terbaru
                        option(value="asc") Diperbarui Terlama
                        //- option(value="relevant-desc") Relevansi Terbaru
                        //- option(value="relevant-asc") Relevansi Terlama
                    
                    CaretDown
                
</template>

<style lang="sass">
.section-filter-area
    background-color: #edf0f7

.container-filter
    display: flex
    align-items: center
    justify-content: space-between

.filter-area
    display: flex
    align-items: center
    gap: 12px
    padding: 12px 0


.select-sort
    height: 40px
    padding: 8px 12px
    border: 1px solid darken(#e3e7f2, 5%)
    background-color: #fff
    border-radius: 4px
    color: var(--main)
    position: relative
    min-width: 183px
    select
        position: absolute
        width: 100%
        height: 100%
        top: 0
        right: 0
        bottom: 0
        left: 0
        z-index: 2
        cursor: pointer
        padding-left: 12px
        background-color: transparent
        -webkit-appearance: none
        -moz-appearance: none
        appearance: none
    svg
        position: absolute
        top: 12px
        right: 12px
        width: 14px
</style>
