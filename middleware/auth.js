import { useFormStore } from "~~/stores/formStore";


import useToken from "~~/composables/useToken"

const formStore = useFormStore();

export default defineNuxtRouteMiddleware( (to, from) => {
    
    const token = useToken();
    if(!token.value) {
        formStore.toggleForm();
        if(from.fullPath !== '/cart' || from.fullPath !== '/wishlist') {
            return navigateTo('/');
        }
        return navigateTo(from.fullPath);
    }
})