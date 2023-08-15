import { useSSRContext, ref, mergeProps, unref } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr } from 'vue/server-renderer';
import { u as useUserStore, k as useFormStore, m as _imports_0$2, n as _imports_1 } from '../server.mjs';

const _sfc_main = {
  __name: "AddToWishlistBtn",
  __ssrInlineRender: true,
  props: {
    product: {
      type: Object
    }
  },
  setup(__props) {
    const props = __props;
    const userStore = useUserStore();
    useFormStore();
    const isProdInWishlist = ref(userStore.wishlist.find((item) => item === props.product.code || item === props.product.productCode));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({ class: "add-to-wishlist" }, _attrs))}>`);
      if (unref(isProdInWishlist)) {
        _push(`<img${ssrRenderAttr("src", _imports_0$2)} alt="Remove from wishlist">`);
      } else {
        _push(`<img${ssrRenderAttr("src", _imports_1)} alt="Add to wishlist">`);
      }
      _push(`</button>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AddToWishlistBtn.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_3 = _sfc_main;

export { __nuxt_component_3 as _ };
//# sourceMappingURL=AddToWishlistBtn-755679b8.mjs.map
