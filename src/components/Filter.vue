<script setup>
import { ref } from '@vue/reactivity';
import CaretDown from './icons/CaretDown.vue';
import Check from './icons/Check.vue';

defineProps({
  name: { type: String, default: null },
});

const openOptions = ref(false);

function toggleOptions() {
  openOptions.value = !openOptions.value;
}
</script>

<template lang="pug">
.box-filter
    button.box-filter__action(@click="toggleOptions()" :class="{'is-open': openOptions}")
        span {{ name }}
        CaretDown
    
    .box-filter__options(v-if="openOptions")
        .filter-options
            .box-checkbox
                input.box-checkbox__input(type="checkbox")
                .box-checkbox__ui
                    .box-checkbox__check-area: Check
                    .box-checkbox__label Option {{ name }} 1

                
        
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
