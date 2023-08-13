<script setup>
defineProps({
    tag: {
        type: String,
    },
    path: {
        type: String,
    },
    title: {
        type: String,
    },
    dark: {
        type: Boolean,
    },
    large: {
        type: Boolean,
    }
})
</script>

<template>
        <NuxtLink 
        v-if="tag === 'link'"
        :to="{ path }"
        :class="['primary-btn', { 'primary-btn_dark': dark, 'large': large }]">
            <span class="primary-btn__text">
                {{ title }}
            </span> 
            <img v-if="dark"
            src="/images/arrow-right_white.png" alt="Arrow">
            <img v-else
            src="/images/arrow-right.png" alt="Arrow">
        </NuxtLink>
        <button v-else
        :class="['primary-btn', { 'primary-btn_dark': dark, 'large': large }]">
            <span class="primary-btn__text">
                {{ title }}
            </span> 
                <img v-if="dark"
                src="/images/arrow-right_white.png" alt="Arrow">
                <img v-else
                src="/images/arrow-right.png" alt="Arrow">
        </button>
    
</template>

<style lang="sass" scoped>
.primary-btn
    position: relative
    height: 50px
    width: fit-content
    display: flex
    align-items: center
    justify-content: space-between
    gap: 15px
    background-color: #fff
    padding-inline: 15px
    &::before, &::after
        content: ''
        position: absolute
        background-color: #fff
    &::before
        width: 100%
        height: 1px
        bottom: -3px
        left: 3px
    &::after
        width: 1px
        height: 100%
        right: -3px
        top: 3px
    &__text
        font-size: 14px
        font-weight: bold
        text-transform: uppercase
        letter-spacing: 2px
        color: #000
    &_dark
        background-color: #000
        &::before, &::after
            content: ''
            position: absolute
            background-color: #000
        .primary-btn__text
            color: #fff
    &.large
        width: calc(100% - 2px)
        max-width: 300px
</style>