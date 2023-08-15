import { _ as _export_sfc, e as useProductsStore, g as useRoute, b as __nuxt_component_1$2 } from '../server.mjs';
import { _ as __nuxt_component_1 } from './products-d8cb5e96.mjs';
import { ref, mergeProps, withCtx, createTextVNode, toDisplayString, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderComponent } from 'vue/server-renderer';
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
  __name: "[name]",
  __ssrInlineRender: true,
  setup(__props) {
    const productsStore = useProductsStore();
    const route = useRoute();
    const routes = [
      {
        id: 1,
        title: "Ultraboost",
        href: "ultraboost"
      },
      {
        id: 2,
        title: "NMD",
        href: "nmd"
      },
      {
        id: 3,
        title: "Gazelle",
        href: "gazelle"
      },
      {
        id: 4,
        title: "Cleats",
        href: "cleats"
      },
      {
        id: 5,
        title: "Stan Smith",
        href: "stan-smith"
      },
      {
        id: 6,
        title: "Samba",
        href: "samba"
      }
    ];
    const filtered = ref(productsStore.allProducts.filter(
      (item) => {
        if (item.short_name) {
          return item.short_name.toLowerCase().includes(route.params.name.toLowerCase());
        }
        return item.name.toLowerCase().includes(route.params.name.toLowerCase());
      }
    ));
    filtered.value = productsStore.getUnique(filtered.value);
    const getRouteTitle = (arr) => {
      return arr.find((item) => route.params.name === item.href).title;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_1$2;
      const _component_products = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "collection mt-[35px]" }, _attrs))} data-v-b2fc1685><div class="collection__head px-[15px] mb-[20px]" data-v-b2fc1685><h1 class="font-adihaus-cn uppercase text-[24px]" data-v-b2fc1685>${ssrInterpolate(getRouteTitle(routes))} shoe collection</h1><nav class="collection__nav relative overflow-x-scroll" data-v-b2fc1685><ul class="collection__nav-list flex h-[50px] items-center" data-v-b2fc1685><!--[-->`);
      ssrRenderList(routes, (link) => {
        _push(`<li class="collection__nav-item text-[#767677] mx-[14px] lg:mx-[20px] whitespace-pre flex items-center h-full" data-v-b2fc1685>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: { path: link.href },
          class: "py-[8px]"
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
      _push(`<!--]--></ul></nav></div><div class="wrapper" data-v-b2fc1685>`);
      _push(ssrRenderComponent(_component_products, { data: unref(filtered) }, null, _parent));
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/popular/[name].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _name_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b2fc1685"]]);

export { _name_ as default };
//# sourceMappingURL=_name_-80eef19c.mjs.map
