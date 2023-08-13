<script setup>
import { useUserStore } from '~~/stores/userStore';

const User = useUserStore();
const products = ref([])
const { data } = await useAsyncData('watched', () => $fetch('/api/list/'+User.watched));
let fetched = data.value;
let watched = User.watched;
for(let i = 0; i < watched.length; i++) {
    for(let j = 0; j < fetched.length; j++) {
        if(fetched[j].code === watched[i]) {
            products.value.push(fetched[j]);
        }
    }
}
products.value = products.value.reverse()
</script>

<template>
    <div v-if="User.watched.length"
    class="container mx-auto recently-watched px-[15px]">
        <h3 class="text-[36px] font-bold capitalize font-adineue">Still interested?</h3>
        <Carousel :products="products" />
    </div>
</template>