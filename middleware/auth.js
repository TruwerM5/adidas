import { useFormStore } from "~~/stores/formStore";


import useToken from "~~/composables/useToken"

const formStore = useFormStore();

// preloadRouteComponents('/');
export default defineNuxtRouteMiddleware( (to, from) => {
    
    const token = useToken();
    const route = useRoute();
    if(!token.value) {
        formStore.toggleForm();
        return navigateTo({path: '/'});
    }
})