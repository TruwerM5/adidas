import { defineStore } from 'pinia';
const navbarList = [
    {
        id: 1,
        title: 'Men',
        href: '/men',
    },{
        id: 2,
        title: 'Women',
        href: '/women',
    },
];
const collectionList = [
    {
        id: 1,
        title: 'originals',
    },{
        id: 2,
        title: 'sport',
    },{
        id: 3,
        title: 'y-3',
    },{
        id: 4,
        title: 'ultraboost', 
    },{
        id: 5,
        title: 'slides',
    },
]
export const useNavStore = defineStore('navbar', {
    state: () => {
        return {
            isNavOpened: false,
            isNavbarVisible: true,
            isCollectionOpened: false,
            isSearchOpened: false,
            navbarList,
            collectionList,
        }
    },
    actions: {
        toggleNav() {
            if(this.isNavOpened) {
                this.isCollectionOpened = false;
            }
            this.isNavOpened = !this.isNavOpened;
        },
        toggleCollection() {
            this.isCollectionOpened = !this.isCollectionOpened;
        },
        hideNavbar() {
            this.isNavbarVisible = false;
        },
        showNavbar() {
            this.isNavbarVisible = true;
        },
        toggleSearch() {
            this.isSearchOpened = !this.isSearchOpened;
        }
        
    }
})