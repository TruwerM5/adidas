import { p as publicAssetsURL } from '../../handlers/renderer.mjs';
import { u as useUserStore, _ as _export_sfc, e as useProductsStore, h as _imports_0$1, i as useAsyncData, d as __nuxt_component_2$1, b as __nuxt_component_1$2 } from '../server.mjs';
import { mergeProps, unref, useSSRContext, ref, withCtx, createVNode, toDisplayString, withAsyncContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrRenderStyle, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import { _ as __nuxt_component_0$2 } from './ProductItem-695ad7a2.mjs';
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
import './AddToWishlistBtn-755679b8.mjs';

const _sfc_main$6 = {
  __name: "Hero",
  __ssrInlineRender: true,
  setup(__props) {
    const heroLinks = [
      {
        id: 1,
        title: "Shop men",
        href: "/men"
      },
      {
        id: 2,
        title: "Shop women",
        href: "/women"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PrimaryBtn = __nuxt_component_2$1;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "hero my-0" }, _attrs))} data-v-cde44b8a><div class="hero__content" data-v-cde44b8a><h1 class="hero__title" data-v-cde44b8a>sprintgtime savings</h1><p class="hero__text" data-v-cde44b8a> Score big on tons of items for a limited time, including outdoor essentials. No code needed. </p><ul class="links" data-v-cde44b8a><!--[-->`);
      ssrRenderList(heroLinks, (item) => {
        _push(`<li class="links__item" data-v-cde44b8a>`);
        _push(ssrRenderComponent(_component_PrimaryBtn, {
          tag: "link",
          title: item.title,
          path: item.href
        }, null, _parent));
        _push(`</li>`);
      });
      _push(`<!--]--></ul></div></section>`);
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Hero.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __nuxt_component_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-cde44b8a"]]);
const _imports_0 = "" + publicAssetsURL("images/chevron_left.png");
const _imports_1 = "" + publicAssetsURL("images/chevron_right.png");
const _sfc_main$5 = {
  __name: "Carousel",
  __ssrInlineRender: true,
  props: {
    products: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    ref(null);
    const position = ref(0);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ProductItem = __nuxt_component_0$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "carousel relative" }, _attrs))} data-v-e66feeb8><div class="carousel__buttons hidden md:flex absolute right-0 -top-[35px] z-50 gap-[20px]" data-v-e66feeb8><button class="w-[24px]" data-v-e66feeb8><img${ssrRenderAttr("src", _imports_0)} alt="Prev" data-v-e66feeb8></button><button class="w-[24px]" data-v-e66feeb8><img${ssrRenderAttr("src", _imports_1)} alt="Next" data-v-e66feeb8></button></div><div class="carousel__inner" data-v-e66feeb8><ul class="carousel__list" style="${ssrRenderStyle({ transform: `translateX(${unref(position)}px)` })}" data-v-e66feeb8><!--[-->`);
      ssrRenderList(props.products, (item) => {
        _push(ssrRenderComponent(_component_ProductItem, {
          class: "min-w-[45%] md:min-w-[270px] lg:min-w-[370px]",
          key: item,
          product: item
        }, null, _parent));
      });
      _push(`<!--]--></ul></div></div>`);
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Carousel.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-e66feeb8"]]);
const _sfc_main$4 = {
  __name: "Recommended",
  __ssrInlineRender: true,
  setup(__props) {
    const productStore = useProductsStore();
    const categories = [
      {
        id: 1,
        title: "What's trending",
        data: productStore.trending.slice(0, 10)
      },
      {
        id: 2,
        title: "Member Exclusives",
        data: productStore.exclusive
      },
      {
        id: 3,
        title: "New Arrivals",
        data: productStore.getUnique(productStore.newArrivals)
      }
    ];
    let currentBtnIndex = ref(0);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Carousel = __nuxt_component_0;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "recommended" }, _attrs))}><div class="container mx-auto"><div class="recommended__categories mb-[15px]"><!--[-->`);
      ssrRenderList(categories, (btn, i) => {
        _push(`<button class="${ssrRenderClass(["recommended__btn", unref(currentBtnIndex) === i ? "active" : ""])}">`);
        if (unref(currentBtnIndex) === i) {
          _push(`<img${ssrRenderAttr("src", _imports_0$1)} alt="Arrow">`);
        } else {
          _push(`<!---->`);
        }
        _push(`<span class="recommended__btn-text">${ssrInterpolate(btn.title)}</span></button>`);
      });
      _push(`<!--]--></div><!--[-->`);
      ssrRenderList(categories, (category, i) => {
        _push(`<!--[-->`);
        if (unref(currentBtnIndex) === i) {
          _push(ssrRenderComponent(_component_Carousel, {
            products: category.data
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></div></section>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Recommended.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_1 = _sfc_main$4;
const _sfc_main$3 = {
  __name: "Popular",
  __ssrInlineRender: true,
  setup(__props) {
    const popular = [
      {
        id: 1,
        title: "ultraboost",
        href: "ultraboost"
      },
      {
        id: 2,
        title: "nmd",
        href: "nmd"
      },
      {
        id: 3,
        title: "gazelle",
        href: "gazelle"
      },
      {
        id: 4,
        title: "cleats",
        href: "cleats"
      },
      {
        id: 5,
        title: "stan smith",
        href: "stan-smith"
      },
      {
        id: 6,
        title: "samba",
        href: "samba"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_1$2;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "popular" }, _attrs))} data-v-4cb0812c><div class="container mx-auto" data-v-4cb0812c><h3 class="popular__title" data-v-4cb0812c> Popular right now </h3><div class="popular__inner" data-v-4cb0812c><!--[-->`);
      ssrRenderList(popular, (item) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: item.id,
          to: "/popular/" + item.href,
          class: "popular__link"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="popular__text" data-v-4cb0812c${_scopeId}>${ssrInterpolate(item.title)}</span>`);
            } else {
              return [
                createVNode("span", { class: "popular__text" }, toDisplayString(item.title), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></div></section>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Popular.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-4cb0812c"]]);
const _sfc_main$2 = {
  __name: "Watched",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const User = useUserStore();
    const products = ref([]);
    const { data } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("watched", () => $fetch("/api/list/" + User.watched))), __temp = await __temp, __restore(), __temp);
    let fetched = data.value;
    let watched = User.watched;
    for (let i = 0; i < watched.length; i++) {
      for (let j = 0; j < fetched.length; j++) {
        if (fetched[j].code === watched[i]) {
          products.value.push(fetched[j]);
        }
      }
    }
    products.value = products.value.reverse();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Carousel = __nuxt_component_0;
      if (unref(User).watched.length) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "container mx-auto recently-watched px-[15px]" }, _attrs))}><h3 class="text-[36px] font-bold capitalize font-adineue">Still interested?</h3>`);
        _push(ssrRenderComponent(_component_Carousel, { products: unref(products) }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Watched.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_3 = _sfc_main$2;
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<section${ssrRenderAttrs(mergeProps({ class: "history mb-0" }, _attrs))} data-v-6e320078><div class="container mx-auto" data-v-6e320078><div class="history__inner" data-v-6e320078><div class="history__item" data-v-6e320078><h3 class="history__title" data-v-6e320078> Stories, style, and sporting goods at adidas, since 1949 </h3><p class="history__text" data-v-6e320078> Through sports, we have the power to change lives. Sports keep us fit. They keep us mindful. They bring us together. Athletes inspire us. They help us to get up and get moving. And sporting goods featuring the latest technologies help us beat our personal best. adidas is home to the runner, the basketball player, the soccer kid, the fitness enthusiast, the yogi. And even the weekend hiker looking to escape the city. The 3-Stripes are everywhere and anywhere. In sports. In music. On life\u2019s stages. Before the whistle blows, during the race, and at the finish line. We\u2019re here to support creators. To improve their game. To live their lives. And to change the world. </p><p class="history__text" data-v-6e320078> adidas is about more than sportswear and workout clothes. We partner with the best in the industry to co-create. This way we offer our fans the sporting goods, style and clothing that match the athletic needs, while keeping sustainability in mind. We\u2019re here to support creators. Improve their game. Create change. And we think about the impact we have on our world. </p></div><div class="history__item" data-v-6e320078><h3 class="history__title" data-v-6e320078> Workout clothes, for any sport </h3><p class="history__text" data-v-6e320078> adidas designs for athletes of all kinds. Creators who love to change the game. People who challenge conventions, break the rules, and define new ones. Then break them all over again. We design sports apparel that gets you moving, winning, and living life to the fullest. We create bras and tights for female athletes who play just as hard as the men. From low to high support. Maximum comfort. We design, innovate and iterate. We test new technologies in action. On the field, the track, the court, and in the pool. We\u2019re inspired by retro workout clothes, creating new streetwear essentials. From NMD and Ozweego to our Firebird tracksuits. From Stan Smith to Superstar. Classic sports models are brought back to life on the streets and the stages around the world. </p><p class="history__text" data-v-6e320078> Through our collections we blur the borders between high fashion and high performance. Like our adidas by Stella McCartney athletic clothing collection \u2013 designed to look the part inside and outside of the gym. Or some of our adidas Originals lifestyle pieces, that can be worn as sports apparel too. Our lives are constantly changing. Becoming more and more versatile. And adidas designs with that in mind. </p></div></div></div></section>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/history.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-6e320078"]]);
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const userStore = useUserStore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Hero = __nuxt_component_0$1;
      const _component_Recommended = __nuxt_component_1;
      const _component_Popular = __nuxt_component_2;
      const _component_Watched = __nuxt_component_3;
      const _component_History = __nuxt_component_4;
      const _component_Joinclub = __nuxt_component_6;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "index" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_Hero, null, null, _parent));
      _push(ssrRenderComponent(_component_Recommended, null, null, _parent));
      _push(ssrRenderComponent(_component_Popular, null, null, _parent));
      if (unref(userStore).isAuthenticated) {
        _push(ssrRenderComponent(_component_Watched, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_History, null, null, _parent));
      _push(ssrRenderComponent(_component_Joinclub, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-8d7028b0.mjs.map
