<script setup>
import { useUserStore } from '~/stores/userStore';

const userStore = useUserStore();


definePageMeta({
    middleware: 'auth',
});


const products = ref([]);

const { data } = await useAsyncData('wishlist', () => $fetch('/api/list/'+userStore.wishlist));



let fetched = data.value;
let wishlist = userStore.wishlist;
for(let i = 0; i < wishlist.length; i++) {
    for(let j = 0; j < fetched.length; j++) {
        if(fetched[j].code === wishlist[i]) {
            products.value.push(fetched[j]);
        }
    }
}

products.value.reverse()

</script>

<template>
    <div class="wishlist max-w-[90%] md:max-w-[60%] mx-auto mt-[30px]">
        <h1 class="wishlist__title uppercase font-adineue text-[30px]">My wishlist</h1>
        <p class="wishlist__quantity uppercase">
            <span v-if="products.length > 1 || products.length == 0">{{ products.length }} items</span>
            <span v-else-if="products.length == 1">1 item</span>
            
        </p>
        <Products :data="products" />
    </div>
    
</template>