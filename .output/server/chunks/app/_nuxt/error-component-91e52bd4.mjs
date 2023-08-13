import { B as Body, _ as __nuxt_component_1, a as __nuxt_component_2 } from '../server.mjs';
import { useSSRContext, withCtx, createVNode } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import 'ofetch';
import 'hookable';
import 'unctx';
import 'destr';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'h3';
import 'ufo';
import 'cookie-es';
import 'ohash';
import 'defu';
import '../../nitro/node-server.mjs';
import 'node-fetch-native/polyfill';
import 'node:http';
import 'node:https';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'unstorage';
import 'radix3';
import 'mongoose';
import 'node:fs';
import 'node:url';
import 'pathe';

const _sfc_main = {
  __name: "error",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Body = Body;
      const _component_HeaderVue = __nuxt_component_1;
      const _component_FooterVue = __nuxt_component_2;
      _push(ssrRenderComponent(_component_Body, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_HeaderVue, null, null, _parent2, _scopeId));
            _push2(`<main class="main flex h-full"${_scopeId}><div class="wrapper flex items-center"${_scopeId}><h1 class="text-center uppercase text-[24px] font-bold font-adineue"${_scopeId}>Page not found</h1></div></main>`);
            _push2(ssrRenderComponent(_component_FooterVue, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_HeaderVue),
              createVNode("main", { class: "main flex h-full" }, [
                createVNode("div", { class: "wrapper flex items-center" }, [
                  createVNode("h1", { class: "text-center uppercase text-[24px] font-bold font-adineue" }, "Page not found")
                ])
              ]),
              createVNode(_component_FooterVue)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("error.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _sfc_main$1 = _sfc_main;

export { _sfc_main$1 as default };
//# sourceMappingURL=error-component-91e52bd4.mjs.map
