import { p as publicAssetsURL } from '../../handlers/renderer.mjs';
import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _export_sfc } from '../server.mjs';

const _imports_0 = "" + publicAssetsURL("images/loading.png");
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "overlay z-100 fixed inset-0 w-full h-full flex justify-center items-center" }, _attrs))} data-v-fff0eb93><img${ssrRenderAttr("src", _imports_0)} alt="Loading" class="loading" data-v-fff0eb93></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Loading.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-fff0eb93"]]);

export { __nuxt_component_0 as _ };
//# sourceMappingURL=Loading-a432e68f.mjs.map
