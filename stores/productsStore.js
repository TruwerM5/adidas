import { defineStore } from "pinia";

export const useProductsStore = defineStore('products', {
    state: () => {
        return {
            trending: [],
            exclusive: [],
            newArrivals: [],
            allProducts: [],
            men: [],
            women: [],
            menSizes: [6, 6.5, 7, 7.5, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13, 14],
            womenSizes: [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5]
        }
    },
    actions: {
        async getProducts() {
            const { data } = await useAsyncData(() => $fetch('/api/products'));
            this.allProducts = data.value;

            this.trending = this.allProducts.filter(item => item.category === 'trending');
            this.exclusive = this.allProducts.filter(item => item.category === 'exclusive');
            this.newArrivals = this.allProducts.filter(item => item.category === 'new');
            
        },
        getUnique: (arr) => {
            return arr.reduce(
                (res, cur) => 
                    res.find((item) => item.name === cur.name) ? res : [...res, cur], []
            )
        }
    }
})