import { _ as __nuxt_component_1 } from './products-d8cb5e96.mjs';
import { ref, withAsyncContext, mergeProps, unref, useSSRContext } from 'vue';
import { u as useUserStore, i as useAsyncData } from '../server.mjs';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import './ProductItem-695ad7a2.mjs';
import './AddToWishlistBtn-755679b8.mjs';
import 'ofetch';
import 'hookable';
import 'unctx';
import 'vue-router';
import 'h3';
import 'ufo';
import 'destr';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'cookie-es';
import 'ohash';
import 'defu';
import '../../nitro/node-server.mjs';
import 'node-fetch-native/polyfill';
import 'node:http';
import 'node:https';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'klona';
import 'unstorage';
import 'radix3';
import 'mongoose';
import 'node:fs';
import 'node:url';
import 'pathe';
import 'http-graceful-shutdown';

const _sfc_main = {
  __name: "wishlist",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const userStore = useUserStore();
    const products = ref([]);
    const { data } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("wishlist", () => $fetch("/api/list/" + userStore.wishlist))), __temp = await __temp, __restore(), __temp);
    let fetched = data.value;
    let wishlist = userStore.wishlist;
    for (let i = 0; i < wishlist.length; i++) {
      for (let j = 0; j < fetched.length; j++) {
        if (fetched[j].code === wishlist[i]) {
          products.value.push(fetched[j]);
        }
      }
    }
    products.value.reverse();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Products = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "wishlist max-w-[90%] md:max-w-[60%] mx-auto mt-[30px]" }, _attrs))}><h1 class="wishlist__title uppercase font-adineue text-[30px]">My wishlist</h1><p class="wishlist__quantity uppercase">`);
      if (unref(products).length > 1 || unref(products).length == 0) {
        _push(`<span>${ssrInterpolate(unref(products).length)} items</span>`);
      } else if (unref(products).length == 1) {
        _push(`<span>1 item</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</p>`);
      _push(ssrRenderComponent(_component_Products, { data: unref(products) }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/wishlist.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=wishlist-bbc2f44a.mjs.map
