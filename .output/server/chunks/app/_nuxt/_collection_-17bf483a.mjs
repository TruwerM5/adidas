import { _ as _export_sfc, e as useProductsStore, f as useNavStore, g as useRoute, b as __nuxt_component_1$2 } from '../server.mjs';
import { _ as __nuxt_component_1 } from './products-d8cb5e96.mjs';
import { ref, mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderComponent, ssrRenderClass } from 'vue/server-renderer';
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
import './ProductItem-695ad7a2.mjs';
import './AddToWishlistBtn-755679b8.mjs';

const _sfc_main = {
  __name: "[collection]",
  __ssrInlineRender: true,
  setup(__props) {
    const ProductsStore = useProductsStore();
    const NavStore = useNavStore();
    const route = useRoute();
    const routes = NavStore.collectionList;
    const data = ref([]);
    const currentGender = ref("");
    const filtered = ref(ProductsStore.allProducts.filter((item) => item.prod_collection === route.params.collection.toLowerCase()));
    filtered.value = ProductsStore.getUnique(filtered.value);
    data.value = filtered.value;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_1$2;
      const _component_Products = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "collection wrapper my-[30px]" }, _attrs))} data-v-5f88b499><div class="collection__header" data-v-5f88b499><h3 class="uppercase text-[28px] font-adihaus-cn" data-v-5f88b499>${ssrInterpolate(unref(route).params.collection)}</h3><nav class="collection__nav relative overflow-x-scroll" data-v-5f88b499><ul class="collection__list flex h-[50px] items-center" data-v-5f88b499><!--[-->`);
      ssrRenderList(unref(routes), (link) => {
        _push(`<li class="collection__list-item capitalize text-[#767677] mx-[14px] lg:mx-[20px] whitespace-pre flex items-center h-full" data-v-5f88b499>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: { path: "/collection/" + link.title }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(link.title)}`);
            } else {
              return [
                createTextVNode(toDisplayString(link.title), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</li>`);
      });
      _push(`<!--]--></ul></nav><div class="collection__filters flex gap-[10px] my-[15px]" data-v-5f88b499><button class="${ssrRenderClass(["collection__btn", { "active": unref(currentGender) === "male" }])}" data-v-5f88b499>Men</button><button class="${ssrRenderClass(["collection__btn", { "active": unref(currentGender) === "female" }])}" data-v-5f88b499>Women</button></div></div><div class="collection__body" data-v-5f88b499>`);
      _push(ssrRenderComponent(_component_Products, { data: unref(data) }, null, _parent));
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/collection/[collection].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _collection_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5f88b499"]]);

export { _collection_ as default };
//# sourceMappingURL=_collection_-17bf483a.mjs.map
