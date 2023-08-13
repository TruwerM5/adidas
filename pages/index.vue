<script setup>
import { useUserStore } from "~/stores/userStore";
const userStore = useUserStore();


</script>

<template>
    <div class="index">
        <Hero />
        <Recommended />
        <Popular />
        <Watched v-if="userStore.isAuthenticated" />
        <History />
        <Joinclub />
    </div>
</template>