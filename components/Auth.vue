<script setup>
import { useFormStore } from '~~/stores/formStore';
import { useUserStore } from '~~/stores/userStore';

const formStore = useFormStore();
const userStore = useUserStore();

async function authProcess() {
    if(!formStore.validateLogin(formStore.email)) {
        return
    }
        
    
    const headers = {'Content-Type': 'application/json'};

    await $fetch('/api/users', {
        method: 'POST',
        body: formStore.email,
        headers
    })
    .then(res => {
        if(res.exists) {
            formStore.currentForm = 'login';
        } else {
            formStore.currentForm = 'signup';
        }
    });
    
}

async function signUpProcess() {
    if(!formStore.validatePassword(formStore.password)) {
        return;
    }
    const headers = { 'Content-Type': 'application/json' };

    await $fetch('/api/signup', {
        method: 'POST', 
        headers, 
        body: { email: formStore.email, password: formStore.password }
    })
    .then(() => {
        location.reload();
    })
}

async function login() {
    
    const headers = { 'Content-Type': 'application/json' };
    await $fetch('/api/login', {
        method: 'POST',
        headers,
        body: { email: formStore.email, password: formStore.password }
    })
    .then( (res) => {
        if(res.err) {
            formStore.passwordErrorMsg = res.err;
            return;
        } else {
            userStore.setToken(res.user.wishlist, res.user.watchedList);
            location.reload();
        }
    })
}

</script>

<template>
    <Transition name="overlay">
        <div v-if="formStore.isFormOpened" class="overlay">
            <form class="auth" @submit.prevent>
                <button class="auth__close-btn" type="button" @click="formStore.toggleForm()">
                    <img src="/images/close-icon.png" alt="Close">
                </button>
                <div class="auth__inner">
                    <template v-if="formStore.currentForm === 'email'">
                        <h3 class="auth__title">YOUR ADICLUB BENEFITS AWAIT!</h3>
                        <span class="auth__text">
                            Get free shipping, discount vouchers and members only products when you’re in adiClub
                        </span>
                        <h4 class="auth__subtitle">LOG IN OR SIGN UP (IT'S FREE)</h4>
                        <label for="email" class="auth__label">Enter your email to access or create your account</label>
                        <div class="auth__input-group">
                            <input 
                            type="email" 
                            name="email" 
                            class="auth__input" 
                            v-model="formStore.email"
                            @keydown.enter="authProcess">
                            <span :class="['auth__input-label', {decreased: formStore.email.length}]">Email</span>
                            <span v-if="formStore.errorMsg.length" 
                            class="text-red-500 absolute top-full left-0">{{ formStore.errorMsg }}</span>
                        </div>
                        <PrimaryBtn :tag="'button'" 
                        :title="'Continue'" 
                        :dark="true" 
                        class="large" 
                        type="button"
                        @click="authProcess" />
                    </template>
                    <template v-else-if="formStore.currentForm === 'signup'">
                        <h3 class="auth__title">WELCOME TO ADICLUB!</h3>
                        <span class="auth__text">
                            Create a password to have full access to adiClub benefits and be able to redeem points, save your shipping details and more.
                        </span>
                        <label for="password" class="auth__label">Enter your email to access or create your account</label>
                        <div class="auth__input-group">
                            <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            class="auth__input" 
                            v-model="formStore.password"
                            @keydown.enter="signUpProcess">
                            <span :class="['auth__input-label', { decreased: formStore.password.length }]">Password</span>
                            <span v-if="formStore.passwordErrorMsg.length" 
                            class="text-red-500 absolute top-full left-0">{{ formStore.passwordErrorMsg }}</span>
                        </div>
                        <PrimaryBtn :tag="'button'" 
                            :title="'Create password'" 
                            :dark="true" 
                            class="large" 
                            type="button"
                            @click="signUpProcess" />
                    </template>
                    <template v-else-if="formStore.currentForm === 'login'">
                        <h3 class="auth__title">LOGIN TO ADICLUB</h3>
                        <span class="auth__text">
                            Get free shipping, discount vouchers and members only products when you’re in adiClub.
                        </span>
                        <label for="password" class="auth__label">Enter your email to access or create your account</label>
                        <div class="auth__input-group">
                            <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            class="auth__input" 
                            v-model="formStore.password"
                            @keydown.enter="login">
                            <span :class="['auth__input-label', { decreased: formStore.password.length }]">Password</span>
                            <span v-if="formStore.passwordErrorMsg.length" 
                            class="text-red-500 absolute top-full left-0">{{ formStore.passwordErrorMsg }}</span>
                        </div>
                        <PrimaryBtn :tag="'button'" 
                            :title="'Sign In'" 
                            :dark="true" 
                            type="button"
                            @click="login" />
                    </template>
                </div>
            </form>
        </div>
    </Transition>
    
</template>

<style lang="sass" scoped>
.overlay-enter-active,
.overlay-leave-active
    transition: all .5s
.overlay-leave-to,
.overlay-enter-from
    opacity: 0
.overlay
    position: fixed
    z-index: 100
    inset: 0
    width: 100%
    height: 100%
    background-color: rgba(0, 0, 0, 0.5)
    display: flex
    align-items: flex-end
    justify-content: center
    @media screen and (min-width: 768px)
        align-items: center
        
.auth
    position: relative
    display: flex
    padding: 20px
    background-color: #FFF
    &__inner
        max-height: 80vh
        max-width: 418px
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
    &__title
        font-size: 24px
        font-weight: bold
        margin-block-end: 20px
    &__text
        display: block
        font-size: 14px
        margin-block-end: 40px
    &__subtitle
        font-size: 18px
        font-weight: bold
        margin-block-end: 10px
    &__label
        display: block
        font-size: 14px
        margin-block-end: 10px
    &__input-group
        position: relative
        height: 54px
        padding: 15px
        margin-block-end: 30px
    &__input-label
        display: block
        position: absolute
        top: 50%
        left: 15px
        transform: translateY(-50%)
        color: #767677
        z-index: 2
        background-color: #fff
        transition: all .2s
        &.decreased
            top: 0
            font-size: 12px
    &__input
        position: absolute
        display: block
        top: 0
        left: 0
        width: 100%
        height: 100%
        border: 1px solid #767677
        line-height: 22px
        padding: 15px
        &:focus
            outline: none
            & + .auth__input-label
                top: 0
                font-size: 12px

</style>