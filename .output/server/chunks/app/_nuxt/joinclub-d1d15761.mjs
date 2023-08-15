import { _ as _export_sfc, k as useFormStore, u as useUserStore, d as __nuxt_component_2$1 } from '../server.mjs';
import { unref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';

const _sfc_main = {
  __name: "joinclub",
  __ssrInlineRender: true,
  setup(__props) {
    const formStore = useFormStore();
    const userStore = useUserStore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PrimaryBtn = __nuxt_component_2$1;
      if (!unref(userStore).isAuthenticated) {
        _push(`<section${ssrRenderAttrs(mergeProps({ class: "join my-0" }, _attrs))} data-v-2118f9ef><div class="container mx-auto" data-v-2118f9ef><div class="join__inner" data-v-2118f9ef><span class="join__title" data-v-2118f9ef> JOIN OUR ADICLUB &amp; GET 15% OFF </span>`);
        _push(ssrRenderComponent(_component_PrimaryBtn, {
          dark: true,
          tag: "button",
          title: "Sign up for free",
          onClick: unref(formStore).toggleForm
        }, null, _parent));
        _push(`</div></div></section>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/joinclub.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_6 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2118f9ef"]]);

export { __nuxt_component_6 as _ };
//# sourceMappingURL=joinclub-d1d15761.mjs.map
