<script setup>
import FooterVue from './components/FooterVue.vue';
import { useNavStore } from './stores/navbarStore';
import { useProductsStore } from './stores/productsStore';
import { useUserStore } from './stores/userStore';
import { useGalleryStore } from './stores/galleryStore';
import { useFormStore } from './stores/formStore';

const navStore = useNavStore();
const productsStore = useProductsStore();
const userStore = useUserStore();
const gallery = useGalleryStore();
const formStore = useFormStore();


productsStore.getProducts();

useHead({
  link: [
    {rel: 'icon', href: '/images/adidas-favicon.ico'}
  ],
  script:[
    {
      src: 'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js',
      tagPosition: 'bodyClose',
      type: 'module'
    },
    {
      src: 'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js',
      tagPosition: 'bodyClose'
    }
  ]
});

if(userStore.isAuthenticated) {
   userStore.initUser();
} else {
  setTimeout(() => {
    formStore.isFormOpened = true;
  }, 5000);
}



</script>
<template>

  <Body :class="[navStore.isNavOpened || gallery.isOpened ? 'overflow-hidden' : '', 'font-adihaus', 'md:overflow-visible']">
    <HeaderVue />
    <main class="main">
      <NuxtPage />
    </main>
    <FooterVue />
    <Auth v-if="!userStore.isAuthenticated" />
    <Logout />
  </Body>
</template>
<style lang="sass">
.main
  margin-top: 105px
</style>