<script setup>
defineProps({
    title: {
        type: String,
        required: true,
    },
});
const isOpened = ref(false);
</script>

<template>
    <div class="accordion">
        <div class="accordion__head">
            <button @click="isOpened = !isOpened"
            class="accordion__btn w-full flex items-center justify-between">
                <span class="accordion__title">{{ title }}</span>
                <img src="/images/chevron.png" alt="Toggle" 
                :class="['transition-transform',{'rotate-180': isOpened}]">
            </button>
        </div>
        <div v-show="isOpened"
        class="accordion__body">
            <slot name="body" />
        </div>
    
    </div>
</template>

<style lang="sass" scoped>
.accordion
    max-width: 970px
    margin-inline: auto
    border-bottom: 1px solid #d3d7da
    &__head
        padding: 30px 15px
    &__body
        padding: 15px
    &__title
        font-weight: bold
</style>