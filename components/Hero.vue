<script setup>


const heroLinks = [
    {
        id: 1,
        title: 'Shop men',
        href: '/men'
    },{
        id: 2,
        title: 'Shop women',
        href: '/women'
    }
]
</script>

<template>
    <section class="hero my-0">
        <div class="hero__content">
            <h1 class="hero__title">sprintgtime savings</h1>
            <p class="hero__text">
                Score big on tons of items for a limited time, including outdoor essentials. No code needed.
            </p>
            <ul class="links">
                <li class="links__item" v-for="item in heroLinks" :key="item.id">
                    <PrimaryBtn :tag="'link'" :title="item.title" :path="item.href" />
                </li>
            </ul>
        </div>
    </section>
</template>

<style scoped lang="sass">
.hero
    background-image: url('/images/hero-bg-2.jpg')
    background-repeat: no-repeat
    background-position: left
    background-size: cover
    min-height: 550px
    display: flex
    align-items: flex-end
    color: #FFF
    padding: 20px
    &__title
        font-family: 'adineue'
        font-size: 30px
        font-weight: bold
        text-transform: uppercase
        margin-block-end: 10px
    &__text
        font-size: 18px
        
.links
    &__item
        margin-block: 15px
</style>