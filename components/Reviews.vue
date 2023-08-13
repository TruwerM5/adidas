<script setup>

const props = defineProps({
    rating: {
        type: Number,
        required: true,
    }
});
const array = ref([]);
const newRating = ref(props.rating);

for(let i = 0; i < 5; i++) {
    if(newRating.value > 1) {
        array.value.push(1);
    } else {
        array.value.push(newRating.value);
    }
    newRating.value--;
}

</script>

<template>
    <div class="flex gap-[6px] items-center h-[16px]">
        <div class="relative star-wrapper" v-for="star,i in array" :key="i">
            <img 
            :style="{width: star * 100 + '%'}"
            src="/images/star-icon_sharp.png" 
            alt="Sharp" class="star">
        </div>
        <span class="rating">{{ rating.toFixed(1) }}</span>
    </div>
    
</template>

<style lang="sass" scoped>

.star-wrapper
    position: relative
    width: 16px
    height: 16px
    overflow: hidden
    background-image: url('/images/star-icon.png')
    background-repeat: no-repeat
    background-size: cover

.star
    width: 0
    height: 16px
    position: absolute
    top: 0
    left: 0
    bottom: 0
    z-index: 2
    object-fit: cover
    object-position: left
    display: block
.rating
    font-family: sans-serif
    font-size: 16px
    font-weight: bold
    margin-left: 10px
</style>