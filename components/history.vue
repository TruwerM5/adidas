<script setup>
</script>

<template>
    <section class="history mb-0">
        <div class="container mx-auto">
            <div class="history__inner">
                <div class="history__item">
            <h3 class="history__title">
                Stories, style, and sporting goods at adidas, since 1949
            </h3>
            <p class="history__text">
                Through sports, we have the power to change lives. Sports keep us fit. 
                They keep us mindful. They bring us together. Athletes inspire us. 
                They help us to get up and get moving. And sporting goods featuring 
                the latest technologies help us beat our personal best. adidas is home 
                to the runner, the basketball player, the soccer kid, the fitness 
                enthusiast, the yogi. And even the weekend hiker looking to escape 
                the city. The 3-Stripes are everywhere and anywhere. In sports. 
                In music. On life’s stages. Before the whistle blows, during the 
                race, and at the finish line. We’re here to support creators. 
                To improve their game. To live their lives. And to change the world.
            </p>
            <p class="history__text">
                adidas is about more than sportswear and workout clothes. We partner 
                with the best in the industry to co-create. This way we offer our fans
                 the sporting goods, style and clothing that match the athletic needs,
                  while keeping sustainability in mind. We’re here to support creators.
                   Improve their game. Create change. And we think about the impact we 
                   have on our world.
            </p>
        </div>
        <div class="history__item">
            <h3 class="history__title">
                Workout clothes, for any sport
            </h3>
            <p class="history__text">
                adidas designs for athletes of all kinds. 
                Creators who love to change the game. People who 
                challenge conventions, break the rules, and define 
                new ones. Then break them all over again. We design 
                sports apparel that gets you moving, winning, and 
                living life to the fullest. We create bras and tights 
                for female athletes who play just as hard as the men. 
                From low to high support. Maximum comfort. We design, 
                innovate and iterate. We test new technologies in action. 
                On the field, the track, the court, and in the pool. We’re 
                inspired by retro workout clothes, creating new streetwear 
                essentials. From NMD and Ozweego to our Firebird tracksuits. 
                From Stan Smith to Superstar. Classic sports models are brought 
                back to life on the streets and the stages around the world.
            </p>
            <p class="history__text">
                Through our collections we blur the borders between high 
                fashion and high performance. Like our adidas by Stella 
                McCartney athletic clothing collection – designed to look 
                the part inside and outside of the gym. Or some of our 
                adidas Originals lifestyle pieces, that can be worn as 
                sports apparel too. Our lives are constantly changing. 
                Becoming more and more versatile. And adidas designs 
                with that in mind.
            </p>
        </div>
            </div>
        </div>
        
    </section>
</template>

<style lang="sass" scoped>
.history
    padding: 40px 15px
    background-color: #f5f5e5
    height: min-content
    &__inner
        display: flex
        flex-direction: column
        grid-template-columns: 1fr
        gap: 15px    
        @media screen and (min-width: 1024px)
            flex-direction: row
    &__item
        display: grid
        grid-template-columns: 1fr
        grid-template-rows: 1fr auto auto
    &__title
        font-family: 'adineue'
        font-size: 36px
        font-weight: bold
        width: 50%
        margin-block-end: 20px
        line-height: 1
    &__text
        &:not(:last-child)
            margin-block-end: 15px
</style>