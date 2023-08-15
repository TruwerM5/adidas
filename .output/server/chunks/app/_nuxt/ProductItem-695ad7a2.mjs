import { _ as __nuxt_component_3 } from './AddToWishlistBtn-755679b8.mjs';
import { _ as _export_sfc, b as __nuxt_component_1$2 } from '../server.mjs';
import { mergeProps, withCtx, createVNode, openBlock, createBlock, toDisplayString, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';

const _sfc_main = {
  __name: "ProductItem",
  __ssrInlineRender: true,
  props: {
    product: {
      required: true
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AddToWishlistBtn = __nuxt_component_3;
      const _component_NuxtLink = __nuxt_component_1$2;
      _push(`<li${ssrRenderAttrs(mergeProps({ class: "product" }, _attrs))} data-v-75174ac3>`);
      _push(ssrRenderComponent(_component_AddToWishlistBtn, {
        class: "product__wishlist",
        product: __props.product
      }, null, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/products/" + __props.product.code,
        class: "product__link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<figure class="product__figure" data-v-75174ac3${_scopeId}><img${ssrRenderAttr("src", "/images/products/" + __props.product.gallery[0])}${ssrRenderAttr("alt", __props.product.title)} class="product__img" data-v-75174ac3${_scopeId}><figcaption class="product__caption" data-v-75174ac3${_scopeId}><span class="product__price flex gap-[5px]" data-v-75174ac3${_scopeId}>`);
            if (__props.product.discount) {
              _push2(`<span class="product__discount text-[#e32b2b]" data-v-75174ac3${_scopeId}> $${ssrInterpolate(__props.product.price - __props.product.price * __props.product.discount / 100)}</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<span class="${ssrRenderClass(["product__no-discount", { "line-through": __props.product.discount }])}" data-v-75174ac3${_scopeId}> $${ssrInterpolate(__props.product.price)}</span></span><p class="product__title" data-v-75174ac3${_scopeId}>${ssrInterpolate(__props.product.name)}</p><p class="product__category" data-v-75174ac3${_scopeId}>${ssrInterpolate(__props.product.category)}</p></figcaption></figure>`);
          } else {
            return [
              createVNode("figure", { class: "product__figure" }, [
                createVNode("img", {
                  src: "/images/products/" + __props.product.gallery[0],
                  alt: __props.product.title,
                  class: "product__img"
                }, null, 8, ["src", "alt"]),
                createVNode("figcaption", { class: "product__caption" }, [
                  createVNode("span", { class: "product__price flex gap-[5px]" }, [
                    __props.product.discount ? (openBlock(), createBlock("span", {
                      key: 0,
                      class: "product__discount text-[#e32b2b]"
                    }, " $" + toDisplayString(__props.product.price - __props.product.price * __props.product.discount / 100), 1)) : createCommentVNode("", true),
                    createVNode("span", {
                      class: ["product__no-discount", { "line-through": __props.product.discount }]
                    }, " $" + toDisplayString(__props.product.price), 3)
                  ]),
                  createVNode("p", { class: "product__title" }, toDisplayString(__props.product.name), 1),
                  createVNode("p", { class: "product__category" }, toDisplayString(__props.product.category), 1)
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ProductItem.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-75174ac3"]]);

export { __nuxt_component_0 as _ };
//# sourceMappingURL=ProductItem-695ad7a2.mjs.map
