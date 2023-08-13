<script setup>

import { useUserStore } from '~~/stores/userStore';
const User = useUserStore();
const props = defineProps({
    item: Object,
})
const itemQuantity = ref(props.item.quantity);



const discountPrice = computed(() => {
    return props.item.discount ? props.item.price - (props.item.price * props.item.discount / 100) : false;
});

const pending = ref(false);
async function removeItem() {
    pending.value = true;
    const body = {
        token: User.token,
        productCode: props.item.productCode,
        size: props.item.size,
        action: 'remove',
    };
    const headers = {'Content-Type': 'application/json'};
    const {data} = await useAsyncData('removeCartItem', () => $fetch('/api/cart', {
        body,
        headers,
        method: 'POST',
    }).then(() => {
        pending.value = false;
        User.initUser();
    }));
    return data.value;
};

 function sayHi(e) {
    pending.value = true;
    User.setQuantity(itemQuantity.value, props.item.productCode, props.item.size)
    .then(() => {
        User.initUser();
    })
    .then(() => {
        pending.value = false;
    });
}

</script>

<template>
    <Loading v-if="pending" />
    <div class="cart-item flex gap-[15px] pr-[15px] mt-[40px] relative">
        <div class="cart-item__img-wrapper w-[150px] min-[600px]:w-[240px]">
            <NuxtLink :to="{path: '/products/'+item.productCode}" class="cart-item__link">
                <img :src="'/images/products/'+item.img" :alt="item.name" class="cart-item__img min-w-[150px]">
            </NuxtLink>
        </div>
        <div class="cart-item__info flex flex-col gap-[10px] justify-between 
       min-[600px]:justify-start min-[600px]:py-[15px]">
            <span class="cart-item__name">{{ item.name  }}</span>
            <p class="cart-item__color">{{ item.color }}</p>
            <span class="cart-item__size">SIZE: {{ item.size  }}</span>
            <div class="cart-item__price-wrapper font-bold md:font-normal">
                <span 
                :class="['cart-item__price cart-item__price_original', 
                {'text-[#767677] line-through': item.discount}]"> <!-- if discount exists -->
                    ${{ item.price }}
                </span>
                <span v-if="item.discount"
                class="cart-item__price cart-item__price_discount text-[#e32b2b]">
                    ${{ discountPrice }}
                </span>
            </div>
        </div>
        <button class="cart-item__delete-btn self-start" @click="removeItem">
                <img src="/images/close-icon.png" alt="Remove">
        </button>
        <div class="cart-item__select-wrapper self-end">
            <select name="quantity" id="quantity" v-model="itemQuantity"
            class="cart-item__select self-center" @change="sayHi">
            <option v-for="i,j in 10" :key="j" :selected="i === itemQuantity"
            :value="i">{{ i }}</option>
            </select>
        </div>
        
    </div>
</template>

<style lang="sass" scoped>
.cart-item
    @media screen and (min-width: 600px)
        border: 1px solid #767677
    &__color
        overflow: hidden
        display: -webkit-box
        -webkit-line-clamp: 1
        -webkit-box-orient: vertical
    &__delete-btn
        position: absolute
        top: 0px
        right: 0px
        @media screen and (min-width: 600px)
            top: 20px
            right: 20px
    &__select-wrapper
        position: absolute
        bottom: 0px
        right: 0px
        border: 1px solid #767677
        padding: 5px
        @media screen and (min-width: 600px)
            bottom: 20px
            right: 20px
            padding: 15px 20px
    &__select
        background-color: #fff
        &:focus
            outline: none
</style>