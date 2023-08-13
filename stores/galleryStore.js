import { defineStore } from "pinia";

export const useGalleryStore = defineStore('gallery', {
    state: () => {
        return {
            isOpened: false,
        }
    },
    actions: {
        toggleGallery() {
            this.isOpened = !this.isOpened;
        }
    }
})