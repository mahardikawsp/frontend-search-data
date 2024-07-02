<template lang="pug">
header.main-header
    .container
        .header-info
            figure.header-info__img: img(src="/images/1.png")
            .header-info__meta
                h1.header-info__title PENCARIAN DATA
                p.header-info__desc Layanan informasi dan fitur satu data untuk meningkatkan efektifitas pengambilan kebijakan dengan berdasarkan data yang dapat dilihat oleh seluruh masyarakat, bersumber dari BPS dan SKPD Kabupaten Banyuwangi.
        .global-search
            form.simple-search(@submit.prevent="fetch")
                input.simple-search__input(placeholder="Cari Indikator", v-model="filter.keyword")
                button.btn-primary.simple-search__cta(@click.prevent="fetch") Data Kabupaten
</template>

<script setup>
import { computed, watch } from '@vue/runtime-core';
import { useSearchStore } from '../stores/search';
const { fetchSearch, filter } = useSearchStore();

function fetch() {
  filter.page = 1;
  fetchSearch();
}

const inputSearch = computed(() => filter.keyword);
watch(inputSearch, (v) => {
  if (!v) {
    filter.page = 1;
    fetchSearch();
  }
});
</script>

<style lang="sass">
.main-header
    padding: 140px 0px 50px 0px
    background-color: var(--bg)
    min-height: 371px
    position: relative
    &::before
        content: ''
        width: 100%
        height: 100%
        position: absolute
        left: 0
        top: 0
        bottom: 0
        right: 0
        background: url('/images/map.svg')no-repeat var(--bg)
        background-position: 0px 20px
        background-size: 100%
        opacity: 0.7

.header-info
    display: flex
    align-items: center
    justify-content: center
    gap: 30px
    z-index: 2
    position: relative
    padding-bottom: 24px
    &__img
        img
            width: 160px
    &__title
        text-transform: uppercase
        font-weight: 800
        color: #437eeb
        font-size: 37px
        position: relative
        z-index: 1
        margin-bottom: 16px
    &__desc
        color: #666666
        line-height: 28px
        margin: 0 0 15px
        text-transform: none
        font-weight: 400
        max-width: 80%

.global-search
    position: relative
    z-index: 2

.simple-search
    display: flex
    align-items: center
    justify-content: center
    &__input
        flex-grow: 1
        display: block
        width: 100%
        height: calc(1.5em + 0.75rem + 2px)
        padding: 0.375rem 0.75rem
        font-size: 1rem
        border-radius: 4px 0px 0px 4px
        font-weight: 400
        line-height: 1.5
        color: #495057
        background-color: #fff
        background-clip: padding-box
        border: 1px solid #ced4da
        border-radius: 0.25rem
        transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out
    &__cta
        border-radius: 0px 4px 4px 0px
        white-space: nowrap
</style>
