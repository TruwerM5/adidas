<script setup>
import { useUserStore } from '~~/stores/userStore';
import { useFormStore } from '~~/stores/formStore';

const User = useUserStore();
const Form = useFormStore();
</script>

<template>
    <div v-if="Form.isLogoutOpened"
    class="overlay">
        <div class="logout">
            <button @click="Form.isLogoutOpened = false"
            class="logout__close-btn">
                <img src="/images/close-icon.png" alt="Close">
            </button>
            <h3 class="uppercase font-bold text-[25px]">Are you sure you want logout?</h3>
            <div class="flex items-center gap-[15px] justify-between">
                <button  @click="Form.isLogoutOpened = false"
                class="logout__cancel-btn">Cancel</button>
                <PrimaryBtn 
                :dark="true"
                :tag="'button'"
                :title="'Log me out'"
                @click="User.logout"
                />
            </div>  
            
        </div>
    </div>
</template>

<style lang="sass" scoped>
.overlay
    position: fixed
    width: 100%
    height: 100%
    background-color: rgba(0, 0, 0, 0.5)
    display: grid
    place-items: center
.logout
    position: relative
    height: 200px
    width: 300px
    display: flex
    flex-direction: column
    justify-content: space-between
    padding: 30px 15px
    background-color: #fff
    &__close-btn
        position: absolute
        width: 50px
        height: 50px
        top: -25px
        right: 15px
        display: flex
        align-items: center
        justify-content: center
        background-color: #fff
        border: 2px solid #ccc
</style>