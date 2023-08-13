<script setup>
import {useNavStore} from '~/stores/navbarStore';
import { useProductsStore } from '~~/stores/productsStore';

const Nav = useNavStore();
const Products = useProductsStore();

const text = ref('');
const prefiltered = ref([]);
prefiltered.value = Products.allProducts.map(item => {
    return {
        name: item.name, 
        code: item.code, 
        img: item.gallery[0]
    }
});
const filtered = ref([]);

function search() {

    filtered.value = prefiltered.value.filter(item => {
        return item.name.toLowerCase().includes(text.value.toLocaleLowerCase());
    });
    if(text.value.length == 0) {
        filtered.value = [];
    }
}

function clear() {
    text.value = '';
    filtered.value = [];
}

function clearAndClose() {
    clear();
    Nav.isSearchOpened = false;
}

</script>

<template>
    <div :class="['search', {'active': Nav.isSearchOpened}]">
        <div class="search__wrapper">
            <div class="search__inner relative">
            <button @click="Nav.toggleSearch"
            class="search__close-btn">
                <img src="/images/arrow-left.png" alt="Close">
            </button>
            <input @keyup="search"
            type="text" class="search__input" placeholder="Search" v-model="text" spellcheck="false">
            <button class="search__clear-btn text-[12px] lg:text-[16px]" @click="clear">
                clear
            </button>
        </div>
        <div class="search__body ml-[30px] lg:ml-0" v-if="filtered.length > 0">
            <div v-for="item,i in filtered" :key="i">
                
                <NuxtLink @click="clearAndClose"
                :to="{path: '/products/'+item.code}" class="flex items-center gap-[10px] my-[10px] lg:text-[20px]">
                    <img :src="'/images/products/'+item.img" alt="" class="max-w-[60px] lg:max-w-[80px]">
                    {{ item.name }} - {{ item.code }}
                </NuxtLink>
            </div>
        </div>
        </div>
        
    </div>
</template>

<style scoped lang="sass">
.search
    position: absolute
    top: 0
    left: -100%
    width: 100%
    height: calc(100vh + 100% ) 
    background-color: #fff
    z-index: 10
    transition: left .3s ease-in
    transition-delay: .2s
    @media screen and (min-width: 1024px)
        display: flex
        flex-direction: column
        align-items: center
        padding-top: 30px
    &.active
        left: 0
    &__inner
        height: 50px
        display: flex
        align-items: center
        background-color: #eceff1
        @media screen and (min-width: 1024px)
            height: 70px
            font-size: 18px
    &__input
        background-color: inherit
        padding-inline: 70px
        &:focus
            outline: none
    &__close-btn
        position: absolute
        top: 50%
        left: 30px
        transform: translateY(-50%)
    &__clear-btn
        position: absolute
        top: 50%
        right: 30px
        transform: translateY(-50%)
        color: #767677
</style>