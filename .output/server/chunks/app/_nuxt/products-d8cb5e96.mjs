import { _ as __nuxt_component_0 } from './ProductItem-695ad7a2.mjs';
import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc } from '../server.mjs';

const _sfc_main = {
  __name: "products",
  __ssrInlineRender: true,
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ProductItem = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "products" }, _attrs))} data-v-ef6e6ed9><ul class="products__list" data-v-ef6e6ed9><!--[-->`);
      ssrRenderList(__props.data, (item, i) => {
        _push(ssrRenderComponent(_component_ProductItem, {
          key: i,
          product: item
        }, null, _parent));
      });
      _push(`<!--]--></ul></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/products.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ef6e6ed9"]]);

export { __nuxt_component_1 as _ };
//# sourceMappingURL=products-d8cb5e96.mjs.map
