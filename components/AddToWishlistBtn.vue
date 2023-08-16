<script setup>
import { useUserStore } from '~~/stores/userStore';
import { useFormStore } from '~~/stores/formStore';


const userStore = useUserStore();
const formStore = useFormStore();


const props = defineProps({
    product: {
        type: Object,
    }
});

let action;

const isProdInWishlist = ref(userStore.wishlist.find(item => item === props.product.code ||item === props.product.productCode));

async function addToWishlistMiddleware(prod) {
    const headers = { 'Content-Type': 'application/json' };
    
    userStore.pending = true;
    if(!userStore.isAuthenticated) {
        return formStore.toggleForm();
    }
    if(!isProdInWishlist.value) {
        action = 'push';
        

    } else {
        action = 'pull';
    }

    try {
        await useAsyncData('wishlist', () => $fetch('/api/wishlist', {
            headers,
            body: { product: prod.code, token: useCookie('token').value, action },
            method: 'POST',
        }).then((res) => {
            if(res.message === 'pushed') {
                userStore.wishlist.push(prod.code);
                isProdInWishlist.value = true;
            } else if (res.message === 'pulled') {

                userStore.wishlist = userStore.wishlist.filter(item => item !== prod.code);
                isProdInWishlist.value = false;
            }
            
            userStore.pending = false;
            
        }));
    } catch(e) {
        console.log(e.message);
    }
    
}

</script>

<template>
    <button class="add-to-wishlist" @click="addToWishlistMiddleware(product)">
        <img v-if="isProdInWishlist" src="/images/wishlist-icon_filled.svg" alt="Remove from wishlist">
        <img v-else src="/images/wishlist-icon.svg" alt="Add to wishlist">
    </button>  
</template>