<script setup>
import { useProductsStore } from '~~/stores/productsStore';
const productsStore = useProductsStore();

const route = useRoute();

const routes = [
    {
        id: 1,
        title: 'Ultraboost',
        href: 'ultraboost',
    }, {
        id: 2,
        title: 'NMD',
        href: 'nmd',
    }, {
        id: 3,
        title: 'Gazelle',
        href: 'gazelle',
    }, {
        id: 4,
        title: 'Cleats',
        href: 'cleats',
    }, {
        id: 5,
        title: 'Stan Smith',
        href: 'stan-smith',
    }, {
        id: 6,
        title: 'Samba',
        href: 'samba',
    }
]

const filtered = ref(productsStore.allProducts.filter(
    item => {
        if(item.short_name) {
            return  item.short_name.toLowerCase()
                .includes(route.params.name.toLowerCase())
        }
        return  item.name.toLowerCase()
                .includes(route.params.name.toLowerCase())
    }
   ));


filtered.value = productsStore.getUnique(filtered.value);

const getRouteTitle = (arr) => {
   return arr.find(item => route.params.name === item.href).title
}

    
</script>

<template>
    <div class="collection mt-[35px]">
        <div class="collection__head px-[15px]  mb-[20px]">
            <h1 class="font-adihaus-cn uppercase text-[24px]">{{ getRouteTitle(routes) }} shoe collection</h1>
            <nav class="collection__nav relative overflow-x-scroll">
                <ul class="collection__nav-list flex h-[50px] items-center">
                    <li v-for="link in routes" :key="link.id"
                    class="collection__nav-item text-[#767677] mx-[14px] lg:mx-[20px] whitespace-pre flex items-center h-full">
                        <NuxtLink :to="{path: link.href}" class="py-[8px]">
                            {{ link.title }}
                        </NuxtLink>
                    </li>
                </ul>
            </nav>
        </div>
        <div class="wrapper">
            
            <products :data="filtered" />

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
</style>