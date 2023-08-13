<script setup>
import { useFormStore } from '~~/stores/formStore';
import { useUserStore } from '~~/stores/userStore';
const formStore = useFormStore();
const userStore = useUserStore();
</script>

<template>
    <section v-if="!userStore.isAuthenticated"
    class="join my-0">
        <div class="container mx-auto">
            <div class="join__inner">
                <span class="join__title">
                    JOIN OUR ADICLUB & GET 15% OFF
                </span>
                <PrimaryBtn 
                :dark="true" 
                :tag="'button'" 
                :title="'Sign up for free'"
                @click="formStore.toggleForm" />
            </div>
        </div>
    </section>
</template>

<style lang="sass" scoped>
.join
    background-color: #ede734
    padding: 40px
    &__inner
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
        gap: 25px
        @media screen and (min-width: 768px)
            flex-direction: row
    &__title
        display: block
        font-family: 'adineue'
        font-size: 30px
        font-weight: 700
        text-align: center
        line-height: 32px
        letter-spacing: 1.5px
</style>