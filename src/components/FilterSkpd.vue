<script setup>
import CaretDown from './icons/CaretDown.vue';
import Check from './icons/Check.vue';
import { useSkpdStore } from '../stores/skpd';
import { useSearchStore } from '../stores/search';
import {
  computed,
  onMounted,
  ref,
  watch,
  watchEffect,
} from '@vue/runtime-core';

const openOptions = ref(false);
const { fetchSkpd, skpd } = useSkpdStore();
const { filter, fetchSearch } = useSearchStore();

function toggleOptions() {
  openOptions.value = !openOptions.value;
}

onMounted(() => {
  fetchSkpd();
});

watchEffect(async () => {
  const temp = [];
  skpd.forEach((el) => {
    if (el.checked) {
      temp.push(el.nama_skpd.toLowerCase());
    }
  });
  filter.skpd = temp.join(',');
});

const skpdFilter = computed(() => filter.skpd);
watch(skpdFilter, (v) => {
  filter.page = 1;
  fetchSearch();
});

function close() {
  openOptions.value = false;
}
</script>

<template lang="pug">
.box-filter(v-click-outside-element="close")
    button.box-filter__action(@click="toggleOptions()" :class="{'is-open': openOptions}")
        span SKPD
        CaretDown
    
    .box-filter__options(v-if="openOptions")
        .filter-options
            .box-checkbox(v-for="(item, index) in skpd", :key="item.id")
                input.box-checkbox__input(type="checkbox", v-model="item.checked")
                .box-checkbox__ui
                    .box-checkbox__check-area: Check
                    .box-checkbox__label {{ item.nama_skpd}}

                
        
</template>

<style lang="sass">

.box-filter
    position: relative
    &__action
        display: flex
        align-items: center
        gap: 8px
        padding: 8px 12px
        border: 1px solid darken(#e3e7f2, 5%)
        background-color: #fff
        border-radius: 4px
        color: var(--main)
        svg
            width: 14px

        &.is-open
            svg
                transform: rotate(180deg)

    &__options
        position: absolute
        top: 100%
        padding-top: 8px
        z-index: 2
        width: 320px



.filter-options
    background-color: #fff
    display: flex
    flex-direction: column
    gap: 12px
    width: 100%
    border: 1px solid var(--border)
    padding: 16px
    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)
</style>
