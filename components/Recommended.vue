<script setup>
import { useProductsStore } from '~~/stores/productsStore';
const productStore = useProductsStore();



const categories = [
    {
        id: 1,
        title: "What's trending",
        data: productStore.trending.slice(0, 10),
    },{
        id: 2,
        title: "Member Exclusives",
        data: productStore.exclusive
    },{
        id: 3,
        title: "New Arrivals",
        data: productStore.getUnique(productStore.newArrivals)
    },
];
let currentBtnIndex = ref(0);
function setContent(index) {
    currentBtnIndex.value = index;
    
}
</script>
<template>
    <section class="recommended">
        <div class="container mx-auto">
            <div class="recommended__categories mb-[15px]">
                <button v-for="btn, i in categories" :key="btn.id"
                @click="setContent(i)"
                :class="['recommended__btn', currentBtnIndex === i ? 'active' : '']">
                    <Transition name="img">
                        <img src="/images/arrow-right.png" alt="Arrow" v-if="currentBtnIndex === i"> 
                    </Transition>
                    <span class="recommended__btn-text">{{ btn.title }}</span> 
                </button>
            </div>
            <template v-for="category, i in categories">
                <Carousel v-if="currentBtnIndex === i"
                :products="category.data" />
            </template>
        </div>
        
        
    </section>
</template>
<style lang="sass">

@import ~/assets/sass/_variables
.recommended
    padding-left: 20px
    &__categories
        font-size: 18px
        font-weight: bold
        display: flex
        gap: 20px
        color: $gray
    &__btn
        display: flex
        align-items: center
        &.active
            color: #000
.img-leave-active, .img-enter-active
    transition: all .5s
.img-leave-from, .img-leave-to
    position: absolute
    display: none
.img-enter-from
    transform: translateX(-30px)
.img-enter-to
    transform: translateX(0)
</style>