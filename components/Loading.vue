<template>
    <div class="overlay z-100 fixed inset-0 w-full h-full flex justify-center items-center">
        <img src="/images/loading.png" alt="Loading" class="loading">
    </div>
</template>

<style lang="sass" scoped>
.overlay
    background-color: rgba(255, 255, 255, 0.4)
    z-index: 100
.loading
    position: relative
    animation: 1s infinite linear spin
@keyframes spin
    0%
        transform: rotate(0)
    100%
        transform: rotate(360deg)
</style>