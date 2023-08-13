<script setup>

definePageMeta({
  middleware: 'notfound',
})

</script>

<template>
    <Body>
    <HeaderVue />
    <main class="main flex h-full">
      <div class="wrapper flex items-center">
        <h1 class="text-center uppercase text-[24px] font-bold font-adineue">Page not found</h1>
      </div>
    </main>
    <FooterVue />
  </Body>
</template>