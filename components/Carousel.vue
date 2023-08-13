<script setup>

const props = defineProps({
    products: {
        type: Object,
        required: true,
    }
})

const list = ref(null);
const position = ref(0);

function scroll(direction) {
    let clientWidth = list.value.clientWidth;
    let scrollWidth = list.value.scrollWidth;
    
    if(direction === 'prev') {
        position.value += clientWidth;
        position.value = Math.min(position.value, 0);
    } else if(direction === 'next') {
        position.value = position.value - clientWidth;
        position.value = Math.max(position.value, -scrollWidth + clientWidth)
    }
}

if(process.client) {
    window.addEventListener('resize', () => {
        if(window.innerWidth < 768)
            position.value = 0;
    })
}

</script>

<template>
    <div class="carousel relative">
        <div class="carousel__buttons hidden md:flex absolute right-0 -top-[35px] z-50 gap-[20px]">
            <button @click="scroll('prev')" class="w-[24px]">
                <img src="/images/chevron_left.png" alt="Prev">
            </button>
            <button @click="scroll('next')"  class="w-[24px]">
                <img src="/images/chevron_right.png" alt="Next">
            </button>
        </div>
        <div class="carousel__inner">
            <ul class="carousel__list" ref="list" :style="{transform: `translateX(${position}px)`}">
                <ProductItem class="min-w-[45%] md:min-w-[270px] lg:min-w-[370px]"
                v-for="item in props.products" :key="item" :product="item" />
            </ul>
        </div>
        
    </div>
</template>

<style lang="sass" scoped>
.carousel
    &__inner
        position: relative
        overflow-x: scroll
        @media screen and (min-width: 1024px)
            overflow-x: hidden
            overflow-y: visible

        &::-webkit-scrollbar
            display: none
    &__list
        display: flex
        gap: 20px
        transition: transform .5s ease-in-out
</style>