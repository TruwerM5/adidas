<script setup>
import {useNavStore} from '~/stores/navbarStore';
import { useFormStore } from '~~/stores/formStore';
import { useUserStore } from '~~/stores/userStore';
import { useProductsStore } from '~~/stores/productsStore';

const navStore = useNavStore();
const formStore = useFormStore();
const userStore = useUserStore();
const prouductsStore = useProductsStore();

let posY = 0;
if(process.client) {
  window.addEventListener('scroll', e => {
    if(window.scrollY > posY && posY >= 120) {
        navStore.hideNavbar();
    } else if(window.scrollY < posY) {
        navStore.showNavbar();
    }
    posY = window.scrollY <= 0 ? 0 : window.scrollY;
  })
};


</script>

<template>
    <header :class="['header', navStore.isNavbarVisible ? 'active' : '']">
        <div class="header__top h-[45px] bg-black"></div>
        <div class="header__bottom ">
            <nav class="navbar h-[60px] flex items-center px-[10px] lg:px-[20px]">
                <button class="navbar__toggler mr-auto" @click="navStore.toggleNav">
                    <img src="/images/burger.png" alt="Menu toggler button">
                </button>
                <NuxtLink to="/" class="mx-auto md:mx-0" @click="isNavOpened = false">
                    <img src="/images/logo.svg" alt="Adidas" class="lg:w-[65px]">
                </NuxtLink>
                <div :class="['navbar__nav md:mx-auto', {'active': navStore.isNavOpened}]">
                    <div class="navbar__top">
                        <NuxtLink to="/" class="mx-auto" @click="navStore.isNavOpened = false">
                            <img src="/images/logo.svg" alt="Adidas">
                        </NuxtLink>
                        <button class="navbar__close-btn"  @click="navStore.isNavOpened = false">
                            <img src="/images/close-icon.png" alt="Close">
                        </button>
                    </div>
                    <ul class="navbar__list">
                        <li v-for="item in navStore.navbarList" :key="item.id" 
                        class="navbar__item" >
                            <NuxtLink :to="{path: item.href}" @click="navStore.isNavOpened = false" 
                            class="navbar__link">
                            {{ item.title }}
                            </NuxtLink>
                        </li>
                        <li class="navbar__item navbar__item_nested md:relative">
                            <button @click="navStore.toggleCollection" class="navbar__btn">Collections</button>
                            <CollectionsList class="collection-list"  />
                        </li>
                        
                    </ul>
                </div>
                
                
                <NuxtLink to="/wishlist"
                class="header__wishlist-btn ml-[20px] relative">
                    
                    <img v-if="userStore.wishlist.length === 0"
                    src="/images/wishlist-icon.png" alt="Wishlist" class="w-[24px]">
                    <template v-else>
                        <img src="/images/wishlist-icon_filled.png" alt="Wishlist" class="w-[24px]">
                        <span 
                        class="wishlist-qty absolute text-[12px] left-1/2 -top-[10px]">{{ userStore.wishlist.length }}</span>
                    </template>
                    
                </NuxtLink>
                <NuxtLink to="/cart"
                class="header__cart-btn ml-[20px] relative">
                    <span v-if="userStore.cart.length > 0"
                    class="cart-qty absolute text-[12px] left-1/2 -top-[10px]">{{ userStore.totalQuantity }}</span>
                    <img src="/images/cart-icon.png" alt="Cart" class="w-[24px]">
                </NuxtLink>
                <button class="header__search-btn ml-[20px]" @click="navStore.toggleSearch">
                    <img src="/images/search-icon.png" alt="Search">
                </button>
                <Search />
                <button v-if="userStore.isAuthenticated"
                class="header__logout-btn ml-[20px]" @click="formStore.isLogoutOpened = true">
                    <img src="/images/logout-icon.png" alt="Logout" class="w-[24px]">
                </button>
                
                
            </nav>
        </div>
    </header>
</template>

<style lang="sass">
.header
    position: fixed
    top: 0
    left: 0
    width: 100%
    transform: translateY(-100%)
    transition: transform .2s ease-in-out
    transition-delay: .1s
    z-index: 90
    &.active
        transform: translateY(0)        
.navbar
    background-color: #FFF
    @media screen and (min-width: 1024px)
        border-bottom: 1px solid #eceff1
    &__toggler
        @media screen and (min-width: 768px)
            display: none
    &__nav
        position: fixed
        top: 0
        left: -100%
        width: 100%
        height: 100vh
        font-size: 18px
        background-color: #FFF
        transition: left .3s ease-in
        transition-delay: .2s
        &.active
            left: 0
            z-index: 90
        @media screen and (min-width: 768px)
            position: static
            width: fit-content
            height: 100%
            font-size: 16px
    &__top
        position: relative
        display: flex
        align-items: center
        height: 60px        
        @media screen and (min-width: 768px)
            display: none
    &__list
        box-shadow: inset 0 1px 0 0 #eceff1
        padding-top: 10px
        @media screen and (min-width: 768px)
            display: flex
            height: 100%
            padding-top: 0
            align-items: center
    &__close-btn
        position: absolute
        right: 20px
        top: 50%
        z-index: 90
        transform: translateY(-50%)
        
    &__item
        height: 45px
        display: flex
        align-items: center
        padding-inline: 30px
        height: 100%
        &_nested
            @media screen and (min-width: 768px)
                &:hover
                    .collection-list
                        display: block
    &__link, &__btn
        text-transform: uppercase
        letter-spacing: 2px
    &__link
        font-weight: bold


.collection-list
    @media screen and (min-width: 768px)
        display: none
        &:hover
            display: block

.cart-qty, .wishlist-qty
    width: 22px
    height: 22px
    border-radius: 50%
    background-color: #0071ae
    color: #fff
    font-weight: 700
    opacity: .9
    font-family: 'adineue'
    line-height: 16px
    display: flex
    justify-content: center
    align-items: center
</style>