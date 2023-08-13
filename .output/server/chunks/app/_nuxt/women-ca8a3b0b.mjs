import { _ as __nuxt_component_0 } from './Loading-da84c215.mjs';
import { _ as __nuxt_component_1 } from './products-6dd72e57.mjs';
import { withAsyncContext, ref, mergeProps, unref, useSSRContext } from 'vue';
import { g as useProductsStore, k as useAsyncData } from '../server.mjs';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import '../../handlers/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'h3';
import '../../nitro/node-server.mjs';
import 'node-fetch-native/polyfill';
import 'node:http';
import 'node:https';
import 'destr';
import 'ofetch';
import 'unenv/runtime/fetch/index';
import 'hookable';
import 'scule';
import 'defu';
import 'ohash';
import 'ufo';
import 'unstorage';
import 'radix3';
import 'mongoose';
import 'node:fs';
import 'node:url';
import 'pathe';
import './ProductItem-44475e3f.mjs';
import './AddToWishlistBtn-6e77be13.mjs';
import 'unctx';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'cookie-es';

const _sfc_main = {
  __name: "women",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const productsStore = useProductsStore();
    const { data, pending } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("men", () => $fetch(`/api/products/gender/female`))), __temp = await __temp, __restore(), __temp);
    const women = ref(productsStore.getUnique(data.value));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Loading = __nuxt_component_0;
      const _component_Products = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "women my-[30px] lg:my-[65px]" }, _attrs))}><div class="wrapper max-w-[1920px] mx-auto"><h3 class="title uppercase font-adihaus-cn text-[28px] lg:text-[38px]">women</h3>`);
      if (unref(pending)) {
        _push(ssrRenderComponent(_component_Loading, null, null, _parent));
      } else {
        _push(ssrRenderComponent(_component_Products, { data: unref(women) }, null, _parent));
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/women.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=women-ca8a3b0b.mjs.map
