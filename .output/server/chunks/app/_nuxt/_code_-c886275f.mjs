import { p as publicAssetsURL } from '../../handlers/renderer.mjs';
import { _ as __nuxt_component_0 } from './Loading-a432e68f.mjs';
import { _ as _export_sfc, e as useProductsStore, k as useFormStore, u as useUserStore, j as useGalleryStore, g as useRoute, i as useAsyncData, l as useHead, a as _imports_0$3, b as __nuxt_component_1$2, d as __nuxt_component_2$1 } from '../server.mjs';
import { _ as __nuxt_component_3 } from './AddToWishlistBtn-755679b8.mjs';
import { useSSRContext, ref, withAsyncContext, unref, withCtx, createTextVNode, createVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, mergeProps } from 'vue';
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrRenderAttrs, ssrRenderStyle, ssrRenderSlot } from 'vue/server-renderer';
import { _ as __nuxt_component_6 } from './joinclub-d1d15761.mjs';
import 'vue-bundle-renderer/runtime';
import 'h3';
import 'devalue';
import '../../nitro/node-server.mjs';
import 'node-fetch-native/polyfill';
import 'node:http';
import 'node:https';
import 'destr';
import 'ofetch';
import 'unenv/runtime/fetch/index';
import 'hookable';
import 'scule';
import 'klona';
import 'defu';
import 'ohash';
import 'ufo';
import 'unstorage';
import 'radix3';
import 'mongoose';
import 'node:fs';
import 'node:url';
import 'pathe';
import 'http-graceful-shutdown';
import 'unctx';
import 'vue-router';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'cookie-es';

const _imports_0$1 = "" + publicAssetsURL("images/star-icon_sharp.png");
const _sfc_main$3 = {
  __name: "Reviews",
  __ssrInlineRender: true,
  props: {
    rating: {
      type: Number,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const array = ref([]);
    const newRating = ref(props.rating);
    for (let i = 0; i < 5; i++) {
      if (newRating.value > 1) {
        array.value.push(1);
      } else {
        array.value.push(newRating.value);
      }
      newRating.value--;
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex gap-[6px] items-center h-[16px]" }, _attrs))} data-v-b601188a><!--[-->`);
      ssrRenderList(unref(array), (star, i) => {
        _push(`<div class="relative star-wrapper" data-v-b601188a><img style="${ssrRenderStyle({ width: star * 100 + "%" })}"${ssrRenderAttr("src", _imports_0$1)} alt="Sharp" class="star" data-v-b601188a></div>`);
      });
      _push(`<!--]--><span class="rating" data-v-b601188a>${ssrInterpolate(__props.rating.toFixed(1))}</span></div>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Reviews.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-b601188a"]]);
const _imports_0 = "" + publicAssetsURL("images/chevron.png");
const _sfc_main$2 = {
  __name: "Accordion",
  __ssrInlineRender: true,
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup(__props) {
    const isOpened = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "accordion" }, _attrs))} data-v-0e31d0dc><div class="accordion__head" data-v-0e31d0dc><button class="accordion__btn w-full flex items-center justify-between" data-v-0e31d0dc><span class="accordion__title" data-v-0e31d0dc>${ssrInterpolate(__props.title)}</span><img${ssrRenderAttr("src", _imports_0)} alt="Toggle" class="${ssrRenderClass(["transition-transform", { "rotate-180": unref(isOpened) }])}" data-v-0e31d0dc></button></div><div style="${ssrRenderStyle(unref(isOpened) ? null : { display: "none" })}" class="accordion__body" data-v-0e31d0dc>`);
      ssrRenderSlot(_ctx.$slots, "body", {}, null, _push, _parent);
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Accordion.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_5 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-0e31d0dc"]]);
const _imports_1 = "" + publicAssetsURL("images/chevron-large.png");
const _imports_2 = "" + publicAssetsURL("images/chevron-large-180.png");
const _sfc_main$1 = {
  __name: "ProductImages",
  __ssrInlineRender: true,
  props: {
    gallery: {
      type: Array
    }
  },
  setup(__props) {
    useGalleryStore();
    const currentIndex = ref(0);
    ref(0);
    const posX = ref(0);
    ref(0);
    ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "overlay flex justify-center" }, _attrs))} data-v-5a9064fd><button class="overlay__close-btn" data-v-5a9064fd><img${ssrRenderAttr("src", _imports_0$3)} alt="Close" data-v-5a9064fd></button><div class="gallery relative max-w-[600px] lg:max-w-[720px] mx-auto z-50 self-center py-[50px] my-[50px]" data-v-5a9064fd><button class="gallery__arrow gallery__arrow_prev" data-v-5a9064fd><img${ssrRenderAttr("src", _imports_1)} alt="Prev" class="w-[48px]" data-v-5a9064fd></button><button class="gallery__arrow gallery__arrow_next" data-v-5a9064fd><img${ssrRenderAttr("src", _imports_2)} alt="Prev" data-v-5a9064fd></button><div class="gallery__inner overflow-hidden" data-v-5a9064fd><ul class="gallery__items flex z-10 min-w-fit" style="${ssrRenderStyle({ transform: `translateX(${-unref(currentIndex) * 100}%)`, left: `${-unref(posX) * 1.1}%` })}" data-v-5a9064fd><!--[-->`);
      ssrRenderList(__props.gallery, (item) => {
        _push(`<li class="gallery__item min-w-full flex justify-center" data-v-5a9064fd><img${ssrRenderAttr("src", "/images/products/" + item)}${ssrRenderAttr("alt", item)} class="w-full" data-v-5a9064fd></li>`);
      });
      _push(`<!--]--></ul></div></div><ul class="gallery__preview flex absolute bottom-[30px] left-1/2 z-50 -translate-x-1/2 w-full justify-center h-[50px]" data-v-5a9064fd><!--[-->`);
      ssrRenderList(__props.gallery, (item, i) => {
        _push(`<li class="flex-1" data-v-5a9064fd><a href="#" class="${ssrRenderClass(["gallery__btn block h-full md:h-auto lg:w-full", { active: unref(currentIndex) === i }])}" data-v-5a9064fd><img${ssrRenderAttr("src", "/images/products/" + item)}${ssrRenderAttr("alt", item)} class="h-full" data-v-5a9064fd></a></li>`);
      });
      _push(`<!--]--></ul></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ProductImages.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_7 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-5a9064fd"]]);
const _sfc_main = {
  __name: "[code]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const productsStore = useProductsStore();
    const formStore = useFormStore();
    const userStore = useUserStore();
    const gallery = useGalleryStore();
    const route = useRoute();
    const otherColors = ref([]);
    const currentSize = ref();
    const sizes = () => currentProd.value.sex === "male" ? productsStore.menSizes : productsStore.womenSizes;
    const responseMsg = ref();
    const error = ref(false);
    const addToBagPending = ref(false);
    const { data: currentProd, pending } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(() => $fetch(`/api/products/${route.params.code}`), "$5NK1ECcNyx")), __temp = await __temp, __restore(), __temp);
    const currentProdName = currentProd.value.name;
    otherColors.value = productsStore.allProducts.filter((item) => item.name === currentProdName && item.sex === currentProd.value.sex);
    async function addToBag() {
      if (!userStore.isAuthenticated) {
        return formStore.toggleForm();
      }
      if (!currentSize.value) {
        responseMsg.value = "Select your size, please";
        error.value = true;
        return;
      }
      addToBagPending.value = true;
      const headers = { "Content-Type": "application/json" };
      const body = {
        productCode: currentProd.value.code,
        size: currentSize.value,
        token: userStore.token,
        action: "insert"
      };
      await useAsyncData("cart", () => $fetch("/api/cart", {
        headers,
        body,
        method: "POST"
      }).then(() => {
        addToBagPending.value = false;
        userStore.initUser();
        responseMsg.value = "Item added to cart";
        setTimeout(() => responseMsg.value = "", 4e3);
      }).catch((e) => {
        console.log(e.message);
      }));
    }
    useHead({
      title: currentProd.value.name + " | " + currentProd.value.color
    });
    if (userStore.isAuthenticated) {
      if (userStore.watched.length == 0 || !userStore.watched.find((item) => item === currentProd.value.code)) {
        userStore.watched.push(currentProd.value.code);
        const headers = { "Content-Type": "application/json" };
        const body = {
          token: userStore.token,
          product: currentProd.value.code
        };
        [__temp, __restore] = withAsyncContext(() => useAsyncData("watched", () => $fetch("/api/watched", {
          headers,
          body,
          method: "POST"
        }))), await __temp, __restore();
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Loading = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_1$2;
      const _component_PrimaryBtn = __nuxt_component_2$1;
      const _component_AddToWishlistBtn = __nuxt_component_3;
      const _component_Reviews = __nuxt_component_4;
      const _component_Accordion = __nuxt_component_5;
      const _component_Joinclub = __nuxt_component_6;
      const _component_ProductImages = __nuxt_component_7;
      _push(`<!--[-->`);
      if (unref(pending)) {
        _push(ssrRenderComponent(_component_Loading, null, null, _parent));
      } else {
        _push(`<div class="product-details" data-v-fc45c3db><nav class="product-details__nav flex gap-[6px] px-[20px] lg:px-[50px]" data-v-fc45c3db>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/",
          class: "product-details__link underline"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Home`);
            } else {
              return [
                createTextVNode("Home")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<span class="delimiter" data-v-fc45c3db>/</span>`);
        if (unref(currentProd).sex === "male") {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/men",
            class: "product-details__link underline"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`Men`);
              } else {
                return [
                  createTextVNode("Men")
                ];
              }
            }),
            _: 1
          }, _parent));
        } else if (unref(currentProd).sex === "female") {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/women",
            class: "product-details__link underline"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`Women`);
              } else {
                return [
                  createTextVNode("Women")
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</nav><div class="sm:flex md:justify-between md:items-center xl:gap-[40px] max-w-[970px] mx-auto mb-[40px]" data-v-fc45c3db><div class="product-details__gallery md:w-1/2" data-v-fc45c3db><a href="#" class="product-details__gallery-toggler" data-v-fc45c3db><figure class="product-details__img relative" data-v-fc45c3db><img${ssrRenderAttr("src", "/images/products/" + unref(currentProd).gallery[0])}${ssrRenderAttr("alt", unref(currentProd).name)} class="mx-auto" data-v-fc45c3db>`);
        if (unref(currentProd).category) {
          _push(`<span class="products-details__category absolute top-[20px] left-[10px] uppercase text-[14px] p-[7px] bg-white leading-none lg:right-[10px] lg:left-auto" data-v-fc45c3db>${ssrInterpolate(unref(currentProd).category)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</figure></a></div><div class="product-details__head w-fit md:w-1/2 mx-auto" data-v-fc45c3db><h3 class="product-details__name" data-v-fc45c3db>${ssrInterpolate(unref(currentProd).name)}</h3><div class="flex gap-[5px]" data-v-fc45c3db><span class="${ssrRenderClass([
          "product-details__price",
          { "product-details__price_initial line-through": unref(currentProd).discount }
        ])}" data-v-fc45c3db> $${ssrInterpolate(unref(currentProd).price)}</span>`);
        if (unref(currentProd).discount) {
          _push(`<span class="product-details__price product-details__price_discount" data-v-fc45c3db> $${ssrInterpolate(unref(currentProd).price - unref(currentProd).price * unref(currentProd).discount / 100)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="flex gap-[5px] my-[10px]" data-v-fc45c3db><span class="product-details__gender" data-v-fc45c3db>`);
        if (unref(currentProd).sex === "male") {
          _push(`<!--[-->Men&#39;s<!--]-->`);
        } else if (unref(currentProd).sex === "female") {
          _push(`<!--[-->Women&#39;s<!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(`</span>`);
        if (unref(currentProd).prod_collection) {
          _push(`<span class="product-details__collection capitalize" data-v-fc45c3db> \u2022 ${ssrInterpolate(unref(currentProd).prod_collection)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><span class="product-details__color" data-v-fc45c3db>${ssrInterpolate(unref(currentProd).color)}</span><div class="product-details__sizes sizes mb-[20px]" data-v-fc45c3db><span class="sizes__title font-bold" data-v-fc45c3db>Sizes</span><div class="sizes__inner" data-v-fc45c3db><!--[-->`);
        ssrRenderList(sizes(), (size, i) => {
          _push(`<button class="${ssrRenderClass(["sizes__item", unref(currentSize) === size ? "bg-black text-white font-bold" : ""])}" data-v-fc45c3db>${ssrInterpolate(size)}</button>`);
        });
        _push(`<!--]--></div>`);
        if (unref(responseMsg)) {
          _push(`<span class="${ssrRenderClass(["block my-[10px]", { error: "text-red-500 " }])}" data-v-fc45c3db>${ssrInterpolate(unref(responseMsg))}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="flex items-stretch gap-[15px] mb-[15px]" data-v-fc45c3db>`);
        _push(ssrRenderComponent(_component_PrimaryBtn, {
          onClick: addToBag,
          title: "add to bag",
          tag: "button",
          dark: true,
          large: true
        }, null, _parent));
        _push(ssrRenderComponent(_component_AddToWishlistBtn, { product: unref(currentProd) }, null, _parent));
        _push(`</div>`);
        _push(ssrRenderComponent(_component_Reviews, {
          rating: unref(currentProd).reviews
        }, null, _parent));
        _push(`</div></div>`);
        if (unref(otherColors).length > 1) {
          _push(`<div class="product-details__other-colors" data-v-fc45c3db><span class="font-bold block" data-v-fc45c3db>${ssrInterpolate(unref(otherColors).length)} colors available</span><div class="flex gap-[12px]" data-v-fc45c3db><!--[-->`);
          ssrRenderList(unref(otherColors), (color) => {
            _push(`<div class="w-[60px] h-[60px]" data-v-fc45c3db>`);
            _push(ssrRenderComponent(_component_NuxtLink, {
              to: "/products/" + color.code
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<img${ssrRenderAttr("src", "/images/products/" + color.gallery[0])}${ssrRenderAttr("alt", color.name)} data-v-fc45c3db${_scopeId}>`);
                } else {
                  return [
                    createVNode("img", {
                      src: "/images/products/" + color.gallery[0],
                      alt: color.name
                    }, null, 8, ["src", "alt"])
                  ];
                }
              }),
              _: 2
            }, _parent));
            _push(`</div>`);
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="product-details__body" data-v-fc45c3db><div class="accordion-wrapper mb-[30px]" data-v-fc45c3db>`);
        _push(ssrRenderComponent(_component_Accordion, {
          title: "Description",
          class: "border-t-[1px] border-t-solid border-t-[#d3d7da]"
        }, {
          body: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="description" data-v-fc45c3db${_scopeId}><div class="md:flex items-center gap-[20px]" data-v-fc45c3db${_scopeId}><div class="description__content flex-1" data-v-fc45c3db${_scopeId}><h3 class="description__title" data-v-fc45c3db${_scopeId}>${ssrInterpolate(unref(currentProd).description.subtitle)}</h3><p class="description__text" data-v-fc45c3db${_scopeId}>${ssrInterpolate(unref(currentProd).description.text)}</p></div><div class="description__picture flex-1" data-v-fc45c3db${_scopeId}><img${ssrRenderAttr("src", "/images/products/" + unref(currentProd).gallery[3])}${ssrRenderAttr("alt", unref(currentProd).name)} class="description__img" data-v-fc45c3db${_scopeId}></div></div></div>`);
            } else {
              return [
                createVNode("div", { class: "description" }, [
                  createVNode("div", { class: "md:flex items-center gap-[20px]" }, [
                    createVNode("div", { class: "description__content flex-1" }, [
                      createVNode("h3", { class: "description__title" }, toDisplayString(unref(currentProd).description.subtitle), 1),
                      createVNode("p", { class: "description__text" }, toDisplayString(unref(currentProd).description.text), 1)
                    ]),
                    createVNode("div", { class: "description__picture flex-1" }, [
                      createVNode("img", {
                        src: "/images/products/" + unref(currentProd).gallery[3],
                        alt: unref(currentProd).name,
                        class: "description__img"
                      }, null, 8, ["src", "alt"])
                    ])
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_Accordion, { title: "Details" }, {
          body: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<ul class="details list-disc list-inside" data-v-fc45c3db${_scopeId}><!--[-->`);
              ssrRenderList(unref(currentProd).details, (item, i) => {
                _push2(`<li class="details__item" data-v-fc45c3db${_scopeId}>${ssrInterpolate(item)}</li>`);
              });
              _push2(`<!--]--></ul>`);
            } else {
              return [
                createVNode("ul", { class: "details list-disc list-inside" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(currentProd).details, (item, i) => {
                    return openBlock(), createBlock("li", {
                      class: "details__item",
                      key: i
                    }, toDisplayString(item), 1);
                  }), 128))
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
        _push(ssrRenderComponent(_component_Joinclub, null, null, _parent));
        if (unref(gallery).isOpened) {
          _push(ssrRenderComponent(_component_ProductImages, {
            gallery: unref(currentProd).gallery
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      }
      if (unref(addToBagPending)) {
        _push(ssrRenderComponent(_component_Loading, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/products/[code].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _code_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-fc45c3db"]]);

export { _code_ as default };
//# sourceMappingURL=_code_-c886275f.mjs.map
