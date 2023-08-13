<script setup>
import { useProductsStore } from '~/stores/productsStore';
import { useFormStore } from '~/stores/formStore';
import { useUserStore } from '~~/stores/userStore';
import { useGalleryStore } from '~~/stores/galleryStore';


const productsStore = useProductsStore();
const formStore = useFormStore();
const userStore = useUserStore();
const gallery = useGalleryStore();

const route = useRoute();

const otherColors = ref([]);

//Sizes
const currentSize = ref(); 
const sizes = () => currentProd.value.sex === 'male' ? productsStore.menSizes : productsStore.womenSizes;

const responseMsg = ref();
const error = ref(false);
const addToBagPending = ref(false);
//Request current product
const { data: currentProd, pending } = await useAsyncData(() => $fetch(`/api/products/${route.params.code}`));
const currentProdName = currentProd.value.name;

//Find other colors if exist
otherColors.value = productsStore.allProducts.filter(item => item.name === currentProdName && item.sex === currentProd.value.sex); 

//Adding to bag
async function addToBag() {
    
    if(!userStore.isAuthenticated) {
        return formStore.toggleForm();
    } 

    if(!currentSize.value) {
        responseMsg.value = 'Select your size, please';
        error.value = true;
        return;
    }
    addToBagPending.value = true;
    const headers = {'Content-Type': 'application/json'};
    const body = {
        productCode: currentProd.value.code, 
        size: currentSize.value, 
        token: userStore.token,
        action: 'insert'
    };
    await useAsyncData('cart', () => $fetch('/api/cart', {
        headers,
        body,
        method: 'POST',
    }).then(() => {
        addToBagPending.value = false;
        userStore.initUser();
        responseMsg.value = 'Item added to cart';
        setTimeout(() => responseMsg.value = '', 4000);
    }).catch(e => {
        console.log(e.message);
    }));
    
}

useHead({
    title: currentProd.value.name + ' | ' + currentProd.value.color
})

//add product to watched
if(userStore.isAuthenticated) {
    if(userStore.watched.length == 0 || !userStore.watched.find(item => item === currentProd.value.code)) {
        userStore.watched.push(currentProd.value.code);
        const headers = {'Content-Type': 'application/json'};
        const body = {
            token: userStore.token,
            product: currentProd.value.code,
        }
        await useAsyncData('watched', () => $fetch('/api/watched', {
            headers,
            body,
            method: 'POST'
        }))
    }
}

</script>

<template>
    <Loading v-if="pending" />
    <div v-else
    class="product-details">
        <nav class="product-details__nav flex gap-[6px] px-[20px] lg:px-[50px]">
                <NuxtLink to="/" class="product-details__link underline">Home</NuxtLink>
                <span class="delimiter">/</span>
                <NuxtLink v-if="currentProd.sex === 'male'" to="/men" class="product-details__link underline">Men</NuxtLink>
                <NuxtLink v-else-if="currentProd.sex === 'female'" to="/women" class="product-details__link underline">Women</NuxtLink>
            </nav>
        <div class="sm:flex md:justify-between md:items-center xl:gap-[40px] max-w-[970px] mx-auto mb-[40px]">
            <div class="product-details__gallery md:w-1/2" @click="gallery.toggleGallery">
                <a href="#" class="product-details__gallery-toggler" @click.prevent>
                    <figure class="product-details__img relative">
                        <img :src="'/images/products/'+currentProd.gallery[0]" :alt="currentProd.name" class="mx-auto">
                        <span v-if="currentProd.category"
                        class="products-details__category absolute top-[20px] left-[10px] uppercase text-[14px] p-[7px] bg-white leading-none lg:right-[10px] lg:left-auto ">
                            {{ currentProd.category }}
                        </span>
                    </figure>
                </a>
            </div>
            <div class="product-details__head w-fit md:w-1/2 mx-auto">
            

            <h3 class="product-details__name">{{ currentProd.name }}</h3>
            <div class="flex gap-[5px]"> <!-- product price -->
                <span 
                :class="['product-details__price', 
                {'product-details__price_initial line-through': currentProd.discount }]">
                    ${{ currentProd.price }}
                </span>
                <span 
                v-if="currentProd.discount"
                class="product-details__price product-details__price_discount">
                    ${{ currentProd.price - (currentProd.price * currentProd.discount / 100) }}
                </span>
            </div>
            <div class="flex gap-[5px] my-[10px]">
                <span class="product-details__gender"> <!--Product gender-->
                    <template v-if="currentProd.sex === 'male'">Men's</template>
                    <template v-else-if="currentProd.sex === 'female'">Women's</template>
                </span>
                <span v-if="currentProd.prod_collection"
                class="product-details__collection capitalize">
                    &bull;
                    {{ currentProd.prod_collection }}
                </span>
            </div>
            
            <span class="product-details__color">{{ currentProd.color }}</span> <!--Product color-->
            
            <!-- Sizes -->
            <div class="product-details__sizes sizes mb-[20px]">
                <span class="sizes__title font-bold">Sizes</span>
                <div class="sizes__inner">
                    <button 
                    :class="['sizes__item', currentSize === size ? 'bg-black text-white font-bold' : '' ]" 
                    v-for="size,i in sizes()" :key="i"
                    @click="currentSize = size">
                    {{ size }}
                    </button>
                </div>
                <span v-if="responseMsg" 
                :class="['block my-[10px]',{ error: 'text-red-500 '}]">{{ responseMsg }}</span>
                
            </div>
            <div class="flex items-stretch gap-[15px] mb-[15px]"> <!-- buttons -->
                <PrimaryBtn 
                @click="addToBag"
                :title="'add to bag'" 
                :tag="'button'" 
                :dark="true" 
                :large="true" />
                <AddToWishlistBtn :product="currentProd"  />
            </div> 
            <Reviews :rating="currentProd.reviews" />
            </div>
        </div>
                
        <div v-if="otherColors.length > 1"
        class="product-details__other-colors">
                    <span class="font-bold block">{{ otherColors.length }} colors available</span>
                    <div class="flex gap-[12px]">
                        <div v-for="color in otherColors" 
                        :key="color._id" class="w-[60px] h-[60px]">
                            <NuxtLink :to="'/products/'+color.code">
                                <img :src="'/images/products/'+color.gallery[0]" :alt="color.name">
                            </NuxtLink>
                        </div>
                    </div>
        </div>
        <div class="product-details__body">                
            <div class="accordion-wrapper mb-[30px]">
                <Accordion :title="'Description'" class="border-t-[1px] border-t-solid border-t-[#d3d7da]">
                    <template #body>
                        <div class="description">
                            <div class="md:flex items-center gap-[20px]">
                                <div class="description__content flex-1">
                                    <h3 class="description__title">{{ currentProd.description.subtitle }}</h3>
                                    <p class="description__text">{{ currentProd.description.text }}</p>
                                </div>
                                <div class="description__picture flex-1">
                                    <img :src="'/images/products/'+currentProd.gallery[3]" 
                                    :alt="currentProd.name" class="description__img">
                                </div>
                            </div>
                        </div>
                    </template>
                </Accordion>
                <Accordion :title="'Details'">
                    <template #body>
                        <ul class="details list-disc list-inside">
                            <li class="details__item " v-for="item,i in currentProd.details" :key="i">
                                {{ item }}
                            </li>
                        </ul>
                    </template>
                </Accordion>
            </div>
        </div>
        <Joinclub />
        <ProductImages v-if="gallery.isOpened"
        :gallery="currentProd.gallery" />
    </div>
    <Loading v-if="addToBagPending" />
</template>

<style lang="sass" scoped>
.router-link-active
    display: block
    border-bottom: 2px solid #000
.product-details
    &__nav
        margin-block: 15px
    &__head
        padding: 10px 20px
    &__name
        font-size: 24px
        font-weight: bold
        font-family: 'adineue'
        letter-spacing: 2px
        text-transform: uppercase
        line-height: 28px
        margin-block: 20px 5px
    &__price
        font-weight: bold
        color: #000
        &_initial
            color: #767677
            font-weight: normal
        &_discount
            font-weight: bold
            color: #e32b2b
    &__other-colors
        margin-inline: auto
        width: fit-content
        padding: 10px 20px
        background-color: #FFF
        @media screen and (min-width: 768px)
            position: sticky
            bottom: 50px
            z-index: 55
    &__color
        display: block
        margin-block: 15px
.description
    &__title
        font-size: 24px
        font-family: 'adineue'
        margin-block-end: 10px
.details
    &__item
        padding-left: 10px
        margin-block-start: 15px 
        font-size: 15px
.sizes
    &__inner
        display: grid
        grid-template-columns: repeat(auto-fill, minmax(70px, 1fr))
        border-left: 1px solid #eceff1
    &__item
        border: 1px solid #eceff1
        border-left: none
        height: 40px
        font-size: 14px
        letter-spacing: -0.2px
        &:hover
            color: #fff
            background-color: #000

</style>