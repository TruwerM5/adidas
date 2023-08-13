<script setup>
import { useNavStore } from '~/stores/navbarStore';
const navStore = useNavStore();


</script>
<template>
    <div class="collections__wrapper">
        <!-- <button @click="navStore.toggleCollection" class="navbar__btn">Collections</button> -->
        <div :class="['collections', {'active': navStore.isCollectionOpened }]">
            <div class="collections__top">
                <button class="collections__close-btn" @click="navStore.toggleCollection">
                    <img src="/images/arrow-left.png" alt="Go back">
                </button>
                <span class="collections__title">Collections</span>
            </div>
            <ul class="collections__list">
                <li v-for="item in navStore.collectionList" :key="item.id"
                class="collections__item">
                    <NuxtLink :to="{path: '/collection/'+item.title}" class="capitalize">
                        {{ item.title }}
                    </NuxtLink>
                    
                </li>
            </ul>
        </div>
    </div>
    
</template>

<style lang="sass" scoped>
.collections
    position: absolute
    width: 100%
    height: 100%
    top: 0
    left: -100%
    transition: left .3s ease-in
    transition-delay: .2s
    background-color: #FFF
    @media screen and (min-width: 768px)
        left: 0
        top: 100%
        height: fit-content
    &.active
        left: 0
    &__top
        height: 60px
        display: flex
        align-items: center
        gap: 20px
        padding-inline: 15px
        @media screen and (min-width: 768px)
            display: none
    &__title
        font-weight: bold
        text-transform: uppercase
    &__list
        padding-top: 10px
        box-shadow: inset 0 1px 0 0 #eceff1
        @media screen and (min-width: 768px)
            padding-top: 0
            height: 100%
    &__item
        height: 45px
        display: flex
        align-items: center
        padding-inline: 30px
    
</style>