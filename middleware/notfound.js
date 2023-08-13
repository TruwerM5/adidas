export default defineNuxtRouteMiddleware((to, from) => {
    const event = useRequestEvent();
    setResponseStatus(event, 404, 'Page not found');
})