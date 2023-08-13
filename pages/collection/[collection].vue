<script setup>
import {useProductsStore} from '~~/stores/productsStore';
import { useNavStore } from '~~/stores/navbarStore';
const ProductsStore = useProductsStore();
const NavStore = useNavStore();
const route = useRoute();

const routes = NavStore.collectionList;

const data = ref([]);
const currentGender = ref('');

const filtered = ref(ProductsStore.allProducts.filter(item => item.prod_collection === route.params.collection.toLowerCase()));
filtered.value = ProductsStore.getUnique(filtered.value);
data.value = filtered.value;
function filterByMale() {
    if(!currentGender.value || currentGender.value === 'female') {
        data.value = filtered.value.filter(item => item.sex === 'male');
        currentGender.value = 'male';
        return;
    }
    data.value = filtered.value;
    currentGender.value = '';
}
function filterByFemale() {
    if(!currentGender.value || currentGender.value === 'male') {
        data.value = filtered.value.filter(item => item.sex === 'female');
        currentGender.value = 'female';
        return;
    }
    data.value = filtered.value;
    currentGender.value = '';
    
}
</script>

<template>
    <div class="collection wrapper my-[30px]">
        <div class="collection__header">
            <h3 class="uppercase text-[28px] font-adihaus-cn">{{ route.params.collection }}</h3>
            <nav class="collection__nav relative overflow-x-scroll">
                <ul class="collection__list flex h-[50px] items-center">
                    <li v-for="link in routes" :key="link.id"
                    class="collection__list-item capitalize text-[#767677] mx-[14px] lg:mx-[20px] whitespace-pre flex items-center h-full">
                        <NuxtLink :to="{path: '/collection/'+link.title}">
                         {{ link.title }}
                        </NuxtLink>
                    </li>
                </ul>
            </nav>
            <div class="collection__filters flex gap-[10px] my-[15px]">
                <button @click="filterByMale" :class="['collection__btn',{'active': currentGender === 'male'}]">Men</button>
                <button @click="filterByFemale" :class="['collection__btn',{'active': currentGender === 'female'}]">Women</button>
            </div>
        </div>
        <div class="collection__body">
            <Products :data="data" />
        </div>
    </div>
</template>

<style lang="sass" scoped>
.router-link-active
    color: #000
    font-weight: bold
    border-bottom: 2px solid #000
.collection
    &__nav::-webkit-scrollbar
        display: none
    &__btn
        border: 1px solid #000
        padding: 5px 10px
        transition: .4s color, .4s background-color
        &.active
            color: #fff
            background-color: #000
</style>