<script setup>
import { useUserStore } from '~~/stores/userStore';

definePageMeta({
    middleware: 'auth'
});

const User = useUserStore();

// const pending = ref(true);

// User.loadCart()
// .then(() => pending.value = false )

const paymentMethods = ref([
    'visa',
    'american-express',
    'master-card',
    'discover',
    'giftcard',
    'paypal',
    'affirm',
    'klarna',
    'afterpay'
])
</script>

<template>
    <Html class="cart-page">
        <Body class="cart-body">
            <Loading v-if="!User.cart" />
            <div v-if="User.cart.length > 0"
            class="cart mt-[100px] max-w-[1175px] mx-auto px-[15px] pb-[30px] lg:flex lg:gap-[50px]">
                <div class="cart__inner md:min-w-[600px] mb-[40px] lg:mb-0">
                    <div class="cart__head mb-[30px]">
                    <h1 class="cart__title uppercase font-bold text-[28px] font-adineue">Your cart</h1>
                        <span class="cart__total">TOTAL: 
                        {{ User.totalQuantity }} item<span v-if="User.totalQuantity !== 1">s</span>
                        <span class="total-sum font-bold"> ${{ User.totalSum }}</span>
                    </span>
                    <p class="cart__message">Items in your bag are not reserved — check out now to make them yours.</p>
                </div>
                
                <CartItem v-for="item,i in User.cart" :key="i" :item="item" />
                </div>
                <div class="cart__summary summary max-w-[516px]">
                    <h3 class="summary__title text-[24px] font-bold uppercase font-adineue mb-[30px]">Order summary</h3>
                    <div class="flex justify-between">
                        <span class="summary__quantity mb-[4px]">
                            {{ User.totalQuantity }} item<span v-if="User.totalQuantity !== 1">s</span>
                        </span>
                        <span class="summary__total">${{ User.totalSum }}</span>
                    </div>
                    <div class="flex justify-between mb-[4px]">
                        <span class="summary__text">Sales Tax</span>
                        <span class="summary__text">-</span>
                    </div>
                    <div class="flex justify-between mb-[4px]">
                        <span class="summary__text">Delivery</span>
                        <span class="summary__text">Free</span>
                    </div>
                    <div class="flex justify-between font-bold mb-[25px]">
                        <span class="summary__text">Total</span>
                        <span class="summary__text">${{ User.totalSum }}</span>
                    </div>
                    <PrimaryBtn :dark="true" :tag="'link'" :path="'/checkout'" :title="'chekout'" :large="true" />
                    <div class="max-w-[400px] mt-[40px]">
                        <span class="uppercase font-bold text-[14px]">Accepted payment methods</span>
                        <div class="flex flex-wrap gap-[5px]">
                            <img v-for="item,i in paymentMethods" 
                            :key="i"
                            :src="'/images/icon-adidas-'+item+'.svg'" 
                            :alt="item"
                            class="flex-1 max-w-[80px]" >
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                <h1 
                class="cart__title uppercase font-bold text-[32px] font-adineue text-center">Your cart is empty</h1>
            </div>
        </Body>
    </Html>
</template>