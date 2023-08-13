<script setup>


definePageMeta({
    middleware: 'auth',
});

</script>

<template>
    <div class="checkout bg-black">
        <img src="/images/checkout-logo.png" alt="Adidas logo" class="checkout__logo mb-[30px]">
        <div class="checkout__content text-white lg:text-[20px]">
            <p class="checkout__text uppercase">
                WEBSITE AND MOBILE APP HAVE BEEN SUSPENDED UNTIL FURTHER NOTICE
            </p>
        </div>
    </div>
</template>

<style lang="sass" scoped>
.checkout
    height: calc(100vh - 155px)
    padding: 20px
    background-image: url('/images/checkout-bg.png')
    background-repeat: no-repeat
    
    background-size: cover
    @media screen and (min-width: 1024px)
        background-size: contain
        background-position: right bottom
</style>