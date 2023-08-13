<script setup>
const popular = [
    {
        id: 1,
        title: 'ultraboost',
        href: 'ultraboost',
    }, {
        id: 2,
        title: 'nmd',
        href: 'nmd',
    }, {
        id: 3,
        title: 'gazelle',
        href: 'gazelle',
    }, {
        id: 4,
        title: 'cleats',
        href: 'cleats',
    }, {
        id: 5,
        title: 'stan smith',
        href: 'stan-smith',
    }, {
        id: 6,
        title: 'samba',
        href: 'samba',
    }
]
</script>

<template>
    <section class="popular">
        <div class="container mx-auto">
            <h3 class="popular__title">
                Popular right now
            </h3>
            <div class="popular__inner">
                <NuxtLink 
                v-for="item in popular" 
                :key="item.id" 
                :to="'/popular/'+item.href"
                class="popular__link">
                    <span class="popular__text">
                        {{ item.title }}
                    </span>
                </NuxtLink>
            </div>
        </div>
    </section>
</template>

<style lang="sass" scoped>
.popular
    padding-inline: 15px
    &__title
        font-size: 22px
        font-weight: bold
        @media screen and (min-width: 1024px)
            font-size: 32px
    &__inner
        display: grid
        grid-template-rows: repeat(auto, 1fr)
        gap: 15px
        @media screen and (min-width: 768px)
            grid-template-columns: repeat(2, 1fr)
        @media screen and (min-width: 1024px)
            grid-template-columns: repeat(3, 1fr)
    &__link
        position: relative
        font-size: 36px
        font-weight: bold
        font-family: adineue
        padding-block: 15px
        &::after
            content: ''
            display: block
            position: absolute
            top: 100%
            left: 0
            width: 100%
            height: 1px
            background-color: #000
        &:hover
            &::after
                height: 8px
</style>