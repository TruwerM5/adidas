<script setup>
    
const props = defineProps({
    data: {
        type: Array,
        required: true,
    }
})


</script>

<template>
    <div class="products">
        <ul class="products__list">
            <ProductItem v-for="item,i in data" :key="i" :product="item" />
        </ul>
    </div>
</template>

<style lang="sass" scoped>
.products
    &__list
        display: grid
        grid-template-columns: 1fr 1fr
        column-gap: 10px
        @media screen and (min-width: 600px)
            grid-template-columns: repeat(3, 1fr)
        @media screen and (min-width: 960px)
            grid-template-columns: repeat(4, 1fr)
</style>