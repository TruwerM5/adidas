<script setup>
import { useProductsStore } from '~/stores/productsStore';

const productsStore = useProductsStore();

const {data, pending} = await useAsyncData('men', () => $fetch(`/api/products/gender/male`));
const men = ref(productsStore.getUnique(data.value));
</script>

<template>
    <div class="men my-[30px] lg:my-[65px]">
        <div class="wrapper max-w-[1920px] mx-auto"> 
            <h3 class="title uppercase font-adihaus-cn text-[28px] lg:text-[38px]">men</h3>
            <Loading v-if="pending" />   
            <Products v-else :data="men" />
        </div>
    </div>
</template>