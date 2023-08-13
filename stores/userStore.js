import { defineStore } from "pinia";

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            token: useCookie('token').value || '',
            number: 0,
            wishlist: [],
            watched: [],
            cart: [],
            pending: false,
        }
    },
    getters: {
        isAuthenticated: (state) => {
            return state.token ? true : false;
        },
        totalSum: (state) => {
            let sum = 0;
            state.cart.forEach(item => {
                if(item.discount) {
                    sum += (item.price - (item.price * item.discount / 100)) * item.quantity;
                } else {
                    sum += item.price * item.quantity;
                }
            });
            return sum;
        },
        totalQuantity: (state) => {
            let count = 0;
            state.cart.forEach(item => {
                count += +item.quantity;
            });
            return count;
        },
        wishlistQty: (state) => {
            return state.wishlist.length;
        },
        cartQty: (state) => {
            return state.cart.length;
        }
    },
    actions: {
        setToken(wishlist, watchedList) {
            this.token = useCookie('token').value;
            this.wishlist = wishlist;
            this.watched = watchedList;            
        },
        
        logout() {
            this.token = null;
            useCookie('token').value = null;
            navigateTo('/');
            location.reload();
        },
        async initUser () {
            const headers = {'authorization': this.token}
            await useAsyncData('user', () => $fetch('/api/user', {
                headers,    
                method: 'GET',
            }).then(res => {
                this.wishlist = res.user.wishlist;
                this.watched = res.user.watchedList;
                this.cart = res.user.cart.products;
            })) 
        },
        async loadCart() {
            const {data} = await useAsyncData('cart', () => $fetch('/api/cart', {
                headers: {
                    token: this.token,
                },
                method: 'GET',
            }));
            this.cart = data.value;
            return true;
        },
        async setQuantity(newValue, code, size) {
            const body = {
                token: this.token,
                code,
                quantity: newValue,
                size
            };
            const headers = {'Content-Type': 'application/json'};

            await useAsyncData('setQuantity', () => $fetch('/api/products/setQuantity', {
                body,
                headers,
                method: 'POST',
            }));
            return true;
        }
    }
    
})