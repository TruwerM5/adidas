import { _ as __nuxt_component_0 } from './Loading-a432e68f.mjs';
import { _ as __nuxt_component_1 } from './products-d8cb5e96.mjs';
import { withAsyncContext, ref, mergeProps, unref, useSSRContext } from 'vue';
import { e as useProductsStore, i as useAsyncData } from '../server.mjs';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import '../../handlers/renderer.mjs';
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
import './ProductItem-695ad7a2.mjs';
import './AddToWishlistBtn-755679b8.mjs';
import 'unctx';
import 'vue-router';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'cookie-es';

const _sfc_main = {
  __name: "men",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const productsStore = useProductsStore();
    const { data, pending } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("men", () => $fetch(`/api/products/gender/male`))), __temp = await __temp, __restore(), __temp);
    const men = ref(productsStore.getUnique(data.value));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Loading = __nuxt_component_0;
      const _component_Products = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "men my-[30px] lg:my-[65px]" }, _attrs))}><div class="wrapper max-w-[1920px] mx-auto"><h3 class="title uppercase font-adihaus-cn text-[28px] lg:text-[38px]">men</h3>`);
      if (unref(pending)) {
        _push(ssrRenderComponent(_component_Loading, null, null, _parent));
      } else {
        _push(ssrRenderComponent(_component_Products, { data: unref(men) }, null, _parent));
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/men.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=men-de25da96.mjs.map
