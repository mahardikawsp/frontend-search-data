<template lang="pug">
.main-navbar
    .container.container--full
        nav.main-navbar__navigation
            a.main-navbar__link(href="") Beranda
            a.main-navbar__link(href="") DataSet
            a.main-navbar__link(href="") Publikasi
            span.main-navbar__divider
            a.btn-primary(href="") Request Data
</template>

<style lang="sass">
.main-navbar
    position: fixed
    top: 0
    left: 0
    width: 100%
    z-index: 10
    &__navigation
        display: flex
        justify-content: flex-end
        align-items: center
        height: 90px
        background-color: #f4f7fc
        padding: 0 20px
        width: 100%
    &__link
        font-size: 13px
        letter-spacing: 0.06em
        padding: 35px 15px
        text-transform: uppercase
        color: var(--gray)
        background-color: transparent !important
        font-weight: 600
        text-decoration: none

    &__divider
        background-color: #e7e7e7
        height: 30px
        width: 1px
        margin: 0px 15px 0px 0px
</style>
