<script setup>
const props = defineProps({
    product: {
        required: true
    }
});
</script>

<template>
    <li class="product">
        <AddToWishlistBtn class="product__wishlist" :product="product" /> 
        <NuxtLink :to="'/products/'+product.code" class="product__link">
            <figure class="product__figure">
            <img :src="'/images/products/' + product.gallery[0]" :alt="product.title" class="product__img">
                <figcaption class="product__caption">

                    <span class="product__price flex gap-[5px]">
                        <span v-if="product.discount"
                        class="product__discount text-[#e32b2b]">
                            &dollar;{{ product.price - ( product.price * product.discount/100) }}
                        </span>
                        <span :class="['product__no-discount', {'line-through': product.discount}]">
                            &dollar;{{ product.price }}
                        </span>
                    </span>
                    <p class="product__title">{{ product.name }}</p>
                    <p class="product__category">{{ product.category }}</p>
                </figcaption>
            </figure>
        </NuxtLink>
        
    </li>
</template>
<style lang="sass" scoped>
.product
    position: relative
    &:hover
        .product__price
            bottom: 110%
    &__wishlist
        position: absolute
        top: 10px
        right: 10px
        width: 24px
    &__caption
        position: relative
        padding: 10px 10px 15px
        font-size: 14px
        font-weight: normal
    &__price
        position: absolute
        bottom: 100%
        display: block
        height: 21px
        display: flex
        align-items: center
        background-color: #FFF
        padding: 3px 5px 2px 5px
        font-size: 12px
        line-height: 1        
        transition: bottom .2s
    &__category
        font-size: 14px
        font-weight: normal
        color: #767677
    // &__img
        
</style>