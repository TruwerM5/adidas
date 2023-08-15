import { u as useUserStore, H as Html, B as Body, d as __nuxt_component_2$1, a as _imports_0$3, _ as _export_sfc, b as __nuxt_component_1$2 } from '../server.mjs';
import { _ as __nuxt_component_0 } from './Loading-a432e68f.mjs';
import { ref, mergeProps, withCtx, unref, openBlock, createBlock, createCommentVNode, createVNode, createTextVNode, toDisplayString, Fragment, renderList, useSSRContext, computed } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr } from 'vue/server-renderer';
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
import '../../handlers/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';

const _sfc_main$1 = {
  __name: "CartItem",
  __ssrInlineRender: true,
  props: {
    item: Object
  },
  setup(__props) {
    const props = __props;
    useUserStore();
    const itemQuantity = ref(props.item.quantity);
    const discountPrice = computed(() => {
      return props.item.discount ? props.item.price - props.item.price * props.item.discount / 100 : false;
    });
    const pending = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Loading = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_1$2;
      _push(`<!--[-->`);
      if (unref(pending)) {
        _push(ssrRenderComponent(_component_Loading, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="cart-item flex gap-[15px] pr-[15px] mt-[40px] relative" data-v-c6afafd1><div class="cart-item__img-wrapper w-[150px] min-[600px]:w-[240px]" data-v-c6afafd1>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: { path: "/products/" + __props.item.productCode },
        class: "cart-item__link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", "/images/products/" + __props.item.img)}${ssrRenderAttr("alt", __props.item.name)} class="cart-item__img min-w-[150px]" data-v-c6afafd1${_scopeId}>`);
          } else {
            return [
              createVNode("img", {
                src: "/images/products/" + __props.item.img,
                alt: __props.item.name,
                class: "cart-item__img min-w-[150px]"
              }, null, 8, ["src", "alt"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="cart-item__info flex flex-col gap-[10px] justify-between min-[600px]:justify-start min-[600px]:py-[15px]" data-v-c6afafd1><span class="cart-item__name" data-v-c6afafd1>${ssrInterpolate(__props.item.name)}</span><p class="cart-item__color" data-v-c6afafd1>${ssrInterpolate(__props.item.color)}</p><span class="cart-item__size" data-v-c6afafd1>SIZE: ${ssrInterpolate(__props.item.size)}</span><div class="cart-item__price-wrapper font-bold md:font-normal" data-v-c6afafd1><span class="${ssrRenderClass([
        "cart-item__price cart-item__price_original",
        { "text-[#767677] line-through": __props.item.discount }
      ])}" data-v-c6afafd1> $${ssrInterpolate(__props.item.price)}</span>`);
      if (__props.item.discount) {
        _push(`<span class="cart-item__price cart-item__price_discount text-[#e32b2b]" data-v-c6afafd1> $${ssrInterpolate(unref(discountPrice))}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><button class="cart-item__delete-btn self-start" data-v-c6afafd1><img${ssrRenderAttr("src", _imports_0$3)} alt="Remove" data-v-c6afafd1></button><div class="cart-item__select-wrapper self-end" data-v-c6afafd1><select name="quantity" id="quantity" class="cart-item__select self-center" data-v-c6afafd1><!--[-->`);
      ssrRenderList(10, (i, j) => {
        _push(`<option${ssrIncludeBooleanAttr(i === unref(itemQuantity)) ? " selected" : ""}${ssrRenderAttr("value", i)} data-v-c6afafd1>${ssrInterpolate(i)}</option>`);
      });
      _push(`<!--]--></select></div></div><!--]-->`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CartItem.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-c6afafd1"]]);
const _sfc_main = {
  __name: "cart",
  __ssrInlineRender: true,
  setup(__props) {
    const User = useUserStore();
    const paymentMethods = ref([
      "visa",
      "american-express",
      "master-card",
      "discover",
      "giftcard",
      "paypal",
      "affirm",
      "klarna",
      "afterpay"
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Html = Html;
      const _component_Body = Body;
      const _component_Loading = __nuxt_component_0;
      const _component_CartItem = __nuxt_component_3;
      const _component_PrimaryBtn = __nuxt_component_2$1;
      _push(ssrRenderComponent(_component_Html, mergeProps({ class: "cart-page" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Body, { class: "cart-body" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (!unref(User).cart) {
                    _push3(ssrRenderComponent(_component_Loading, null, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(User).cart.length > 0) {
                    _push3(`<div class="cart mt-[100px] max-w-[1175px] mx-auto px-[15px] pb-[30px] lg:flex lg:gap-[50px]"${_scopeId2}><div class="cart__inner md:min-w-[600px] mb-[40px] lg:mb-0"${_scopeId2}><div class="cart__head mb-[30px]"${_scopeId2}><h1 class="cart__title uppercase font-bold text-[28px] font-adineue"${_scopeId2}>Your cart</h1><span class="cart__total"${_scopeId2}>TOTAL: ${ssrInterpolate(unref(User).totalQuantity)} item`);
                    if (unref(User).totalQuantity !== 1) {
                      _push3(`<span${_scopeId2}>s</span>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`<span class="total-sum font-bold"${_scopeId2}> $${ssrInterpolate(unref(User).totalSum)}</span></span><p class="cart__message"${_scopeId2}>Items in your bag are not reserved \u2014 check out now to make them yours.</p></div><!--[-->`);
                    ssrRenderList(unref(User).cart, (item, i) => {
                      _push3(ssrRenderComponent(_component_CartItem, {
                        key: i,
                        item
                      }, null, _parent3, _scopeId2));
                    });
                    _push3(`<!--]--></div><div class="cart__summary summary max-w-[516px]"${_scopeId2}><h3 class="summary__title text-[24px] font-bold uppercase font-adineue mb-[30px]"${_scopeId2}>Order summary</h3><div class="flex justify-between"${_scopeId2}><span class="summary__quantity mb-[4px]"${_scopeId2}>${ssrInterpolate(unref(User).totalQuantity)} item`);
                    if (unref(User).totalQuantity !== 1) {
                      _push3(`<span${_scopeId2}>s</span>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</span><span class="summary__total"${_scopeId2}>$${ssrInterpolate(unref(User).totalSum)}</span></div><div class="flex justify-between mb-[4px]"${_scopeId2}><span class="summary__text"${_scopeId2}>Sales Tax</span><span class="summary__text"${_scopeId2}>-</span></div><div class="flex justify-between mb-[4px]"${_scopeId2}><span class="summary__text"${_scopeId2}>Delivery</span><span class="summary__text"${_scopeId2}>Free</span></div><div class="flex justify-between font-bold mb-[25px]"${_scopeId2}><span class="summary__text"${_scopeId2}>Total</span><span class="summary__text"${_scopeId2}>$${ssrInterpolate(unref(User).totalSum)}</span></div>`);
                    _push3(ssrRenderComponent(_component_PrimaryBtn, {
                      dark: true,
                      tag: "link",
                      path: "/checkout",
                      title: "chekout",
                      large: true
                    }, null, _parent3, _scopeId2));
                    _push3(`<div class="max-w-[400px] mt-[40px]"${_scopeId2}><span class="uppercase font-bold text-[14px]"${_scopeId2}>Accepted payment methods</span><div class="flex flex-wrap gap-[5px]"${_scopeId2}><!--[-->`);
                    ssrRenderList(unref(paymentMethods), (item, i) => {
                      _push3(`<img${ssrRenderAttr("src", "/images/icon-adidas-" + item + ".svg")}${ssrRenderAttr("alt", item)} class="flex-1 max-w-[80px]"${_scopeId2}>`);
                    });
                    _push3(`<!--]--></div></div></div></div>`);
                  } else {
                    _push3(`<div${_scopeId2}><h1 class="cart__title uppercase font-bold text-[32px] font-adineue text-center"${_scopeId2}>Your cart is empty</h1></div>`);
                  }
                } else {
                  return [
                    !unref(User).cart ? (openBlock(), createBlock(_component_Loading, { key: 0 })) : createCommentVNode("", true),
                    unref(User).cart.length > 0 ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "cart mt-[100px] max-w-[1175px] mx-auto px-[15px] pb-[30px] lg:flex lg:gap-[50px]"
                    }, [
                      createVNode("div", { class: "cart__inner md:min-w-[600px] mb-[40px] lg:mb-0" }, [
                        createVNode("div", { class: "cart__head mb-[30px]" }, [
                          createVNode("h1", { class: "cart__title uppercase font-bold text-[28px] font-adineue" }, "Your cart"),
                          createVNode("span", { class: "cart__total" }, [
                            createTextVNode("TOTAL: " + toDisplayString(unref(User).totalQuantity) + " item", 1),
                            unref(User).totalQuantity !== 1 ? (openBlock(), createBlock("span", { key: 0 }, "s")) : createCommentVNode("", true),
                            createVNode("span", { class: "total-sum font-bold" }, " $" + toDisplayString(unref(User).totalSum), 1)
                          ]),
                          createVNode("p", { class: "cart__message" }, "Items in your bag are not reserved \u2014 check out now to make them yours.")
                        ]),
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(User).cart, (item, i) => {
                          return openBlock(), createBlock(_component_CartItem, {
                            key: i,
                            item
                          }, null, 8, ["item"]);
                        }), 128))
                      ]),
                      createVNode("div", { class: "cart__summary summary max-w-[516px]" }, [
                        createVNode("h3", { class: "summary__title text-[24px] font-bold uppercase font-adineue mb-[30px]" }, "Order summary"),
                        createVNode("div", { class: "flex justify-between" }, [
                          createVNode("span", { class: "summary__quantity mb-[4px]" }, [
                            createTextVNode(toDisplayString(unref(User).totalQuantity) + " item", 1),
                            unref(User).totalQuantity !== 1 ? (openBlock(), createBlock("span", { key: 0 }, "s")) : createCommentVNode("", true)
                          ]),
                          createVNode("span", { class: "summary__total" }, "$" + toDisplayString(unref(User).totalSum), 1)
                        ]),
                        createVNode("div", { class: "flex justify-between mb-[4px]" }, [
                          createVNode("span", { class: "summary__text" }, "Sales Tax"),
                          createVNode("span", { class: "summary__text" }, "-")
                        ]),
                        createVNode("div", { class: "flex justify-between mb-[4px]" }, [
                          createVNode("span", { class: "summary__text" }, "Delivery"),
                          createVNode("span", { class: "summary__text" }, "Free")
                        ]),
                        createVNode("div", { class: "flex justify-between font-bold mb-[25px]" }, [
                          createVNode("span", { class: "summary__text" }, "Total"),
                          createVNode("span", { class: "summary__text" }, "$" + toDisplayString(unref(User).totalSum), 1)
                        ]),
                        createVNode(_component_PrimaryBtn, {
                          dark: true,
                          tag: "link",
                          path: "/checkout",
                          title: "chekout",
                          large: true
                        }),
                        createVNode("div", { class: "max-w-[400px] mt-[40px]" }, [
                          createVNode("span", { class: "uppercase font-bold text-[14px]" }, "Accepted payment methods"),
                          createVNode("div", { class: "flex flex-wrap gap-[5px]" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(paymentMethods), (item, i) => {
                              return openBlock(), createBlock("img", {
                                key: i,
                                src: "/images/icon-adidas-" + item + ".svg",
                                alt: item,
                                class: "flex-1 max-w-[80px]"
                              }, null, 8, ["src", "alt"]);
                            }), 128))
                          ])
                        ])
                      ])
                    ])) : (openBlock(), createBlock("div", { key: 2 }, [
                      createVNode("h1", { class: "cart__title uppercase font-bold text-[32px] font-adineue text-center" }, "Your cart is empty")
                    ]))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Body, { class: "cart-body" }, {
                default: withCtx(() => [
                  !unref(User).cart ? (openBlock(), createBlock(_component_Loading, { key: 0 })) : createCommentVNode("", true),
                  unref(User).cart.length > 0 ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "cart mt-[100px] max-w-[1175px] mx-auto px-[15px] pb-[30px] lg:flex lg:gap-[50px]"
                  }, [
                    createVNode("div", { class: "cart__inner md:min-w-[600px] mb-[40px] lg:mb-0" }, [
                      createVNode("div", { class: "cart__head mb-[30px]" }, [
                        createVNode("h1", { class: "cart__title uppercase font-bold text-[28px] font-adineue" }, "Your cart"),
                        createVNode("span", { class: "cart__total" }, [
                          createTextVNode("TOTAL: " + toDisplayString(unref(User).totalQuantity) + " item", 1),
                          unref(User).totalQuantity !== 1 ? (openBlock(), createBlock("span", { key: 0 }, "s")) : createCommentVNode("", true),
                          createVNode("span", { class: "total-sum font-bold" }, " $" + toDisplayString(unref(User).totalSum), 1)
                        ]),
                        createVNode("p", { class: "cart__message" }, "Items in your bag are not reserved \u2014 check out now to make them yours.")
                      ]),
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(User).cart, (item, i) => {
                        return openBlock(), createBlock(_component_CartItem, {
                          key: i,
                          item
                        }, null, 8, ["item"]);
                      }), 128))
                    ]),
                    createVNode("div", { class: "cart__summary summary max-w-[516px]" }, [
                      createVNode("h3", { class: "summary__title text-[24px] font-bold uppercase font-adineue mb-[30px]" }, "Order summary"),
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("span", { class: "summary__quantity mb-[4px]" }, [
                          createTextVNode(toDisplayString(unref(User).totalQuantity) + " item", 1),
                          unref(User).totalQuantity !== 1 ? (openBlock(), createBlock("span", { key: 0 }, "s")) : createCommentVNode("", true)
                        ]),
                        createVNode("span", { class: "summary__total" }, "$" + toDisplayString(unref(User).totalSum), 1)
                      ]),
                      createVNode("div", { class: "flex justify-between mb-[4px]" }, [
                        createVNode("span", { class: "summary__text" }, "Sales Tax"),
                        createVNode("span", { class: "summary__text" }, "-")
                      ]),
                      createVNode("div", { class: "flex justify-between mb-[4px]" }, [
                        createVNode("span", { class: "summary__text" }, "Delivery"),
                        createVNode("span", { class: "summary__text" }, "Free")
                      ]),
                      createVNode("div", { class: "flex justify-between font-bold mb-[25px]" }, [
                        createVNode("span", { class: "summary__text" }, "Total"),
                        createVNode("span", { class: "summary__text" }, "$" + toDisplayString(unref(User).totalSum), 1)
                      ]),
                      createVNode(_component_PrimaryBtn, {
                        dark: true,
                        tag: "link",
                        path: "/checkout",
                        title: "chekout",
                        large: true
                      }),
                      createVNode("div", { class: "max-w-[400px] mt-[40px]" }, [
                        createVNode("span", { class: "uppercase font-bold text-[14px]" }, "Accepted payment methods"),
                        createVNode("div", { class: "flex flex-wrap gap-[5px]" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(paymentMethods), (item, i) => {
                            return openBlock(), createBlock("img", {
                              key: i,
                              src: "/images/icon-adidas-" + item + ".svg",
                              alt: item,
                              class: "flex-1 max-w-[80px]"
                            }, null, 8, ["src", "alt"]);
                          }), 128))
                        ])
                      ])
                    ])
                  ])) : (openBlock(), createBlock("div", { key: 2 }, [
                    createVNode("h1", { class: "cart__title uppercase font-bold text-[32px] font-adineue text-center" }, "Your cart is empty")
                  ]))
                ]),
                _: 1
              })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/cart.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=cart-8c5343ef.mjs.map
