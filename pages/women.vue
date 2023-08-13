<script setup>

import { useProductsStore } from '~/stores/productsStore';

const productsStore = useProductsStore();
const {data, pending} = await useAsyncData('men', () => $fetch(`/api/products/gender/female`));
const women = ref(productsStore.getUnique(data.value));
</script>
<template>
    <div class="women my-[30px] lg:my-[65px]">
        <div class="wrapper max-w-[1920px] mx-auto"> 
            <h3 class="title uppercase font-adihaus-cn text-[28px] lg:text-[38px]">women</h3>
            <Loading v-if="pending" />
            <Products v-else :data="women" />
        </div>
    </div>
    
</template>