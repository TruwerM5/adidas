<script setup>

import { useGalleryStore } from '~~/stores/galleryStore';
const galleryStore = useGalleryStore();

const props = defineProps({
    gallery: {
        type: Array,
    }
});



const currentIndex = ref(0);
const startX = ref(0);
const posX = ref(0);
const newPosX = ref(0);
const isStarted = ref(false);

function touchStart(e) {
    isStarted.value = true;
    startX.value = e.changedTouches[0].clientX;
}

function touchMove(e) {
    if(!isStarted.value) {
        return;
    }
    posX.value = startX.value - e.changedTouches[0].clientX;
    
}

function touchEnd(e) {
    isStarted.value = false;
    let delta = startX.value - e.changedTouches[0].clientX;
    if(delta > 0) {
        move('next');
    } else if(delta < 0) {
        move('prev');
    }
    posX.value = 0;

    move();
        
}

function move(direction) {
    if(currentIndex.value < props.gallery.length - 1 && direction == 'next' ) {
        currentIndex.value++;
    } else if(currentIndex.value != 0 &&  direction == 'prev') {
        currentIndex.value--;
    }
    
}

function moveTo(index) {
    currentIndex.value = index;
}

function moveOne(direction) {
    if(direction > 0) {
        if(currentIndex.value < props.gallery.length-1)
            currentIndex.value++;
        else 
            currentIndex.value = 0;
    } else if(direction < 0) {
        if(currentIndex.value > 0)
            currentIndex.value--;
        else 
            currentIndex.value = props.gallery.length - 1;
    }
    return true;
}
</script>

<template>
    <div class="overlay flex justify-center">
        <button class="overlay__close-btn" @click="galleryStore.toggleGallery">
            <img src="/images/close-icon.png" alt="Close">
        </button>
        <div 
        @touchstart="touchStart"
        @touchmove="touchMove"
        @touchend="touchEnd"
        class="gallery relative max-w-[600px] lg:max-w-[720px] mx-auto z-50 self-center py-[50px] my-[50px]">
            <button class="gallery__arrow gallery__arrow_prev" @click="moveOne(-1)">
                <img src="/images/chevron-large.png" alt="Prev" class="w-[48px]">
            </button>
            <button class="gallery__arrow gallery__arrow_next" @click="moveOne(1)">
                <img src="/images/chevron-large-180.png" alt="Prev">
            </button>
            <div class="gallery__inner overflow-hidden">
                <ul class="gallery__items flex z-10 min-w-fit" 
            
                :style="{transform: `translateX(${-currentIndex * 100}%)`, left: `${-posX * 1.1}%` }">
                <li class="gallery__item min-w-full flex justify-center" v-for="item in gallery" :key="item">
                    <img :src="'/images/products/'+item" :alt="item" class="w-full">
                </li>
            </ul>
            </div>
            
        </div>
        <ul class="gallery__preview flex absolute bottom-[30px] left-1/2 z-50 -translate-x-1/2 w-full justify-center h-[50px]">
            <li v-for="item,i in gallery" :key="item" class="flex-1">
                <a href="#" @click="moveTo(i)" 
                :class="['gallery__btn block h-full md:h-auto lg:w-full',{ active: currentIndex === i}]">
                    <img :src="'/images/products/'+item" :alt="item" class="h-full">
                </a>
            </li>
        </ul>
    </div>
</template>

<style lang="sass" scoped>
.overlay
    position: fixed
    top: 0
    left: 0
    width: 100vw
    height: 100%
    z-index: 100
    background-color: #fff
    &__close-btn
        position: absolute
        right: 30px
        top: 30px
        z-index: 100
.gallery
    @media screen and (min-width: 1920px)
        max-width: 900px
    &__items
        position: relative
        left: 0
        transition: transform .5s, left .3s
    &__btn.active
        display: block
        border-bottom: 2px solid #2ada71
    &__preview
        max-width: 750px
        margin-inline: auto
        @media screen and (min-width: 1024px)
            width: 60px
            left: 30px
            flex-direction: column
            align-items: center
            justify-content: center
            gap: 5px
            transform: translateX(0)
            z-index: 90
            top: 50%
        @media screen and (min-width: 1280px)
            width: 70px
            transform: translateY(-50%)
        @media screen and (min-width: 1920px)
            width: 95px
    &__arrow
        display: none
        position: absolute
        top: 50%
        transform: translateY(-50%)
        z-index: 100
        &_prev
            left: 0
        &_next
            right: 0
        @media screen and (min-width: 1024px)
            display: block

</style>