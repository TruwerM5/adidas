import { k as useFormStore, q as defineNuxtRouteMiddleware, r as navigateTo, o as useState, p as useCookie } from '../server.mjs';
import 'vue';
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
import 'vue/server-renderer';
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

function useToken() {
  return useState("token", () => useCookie("token"));
}
const formStore = useFormStore();
const auth = /* @__PURE__ */ defineNuxtRouteMiddleware((to, from) => {
  const token = useToken();
  if (!token.value) {
    formStore.toggleForm();
    if (from.fullPath !== "/cart" || from.fullPath !== "/wishlist") {
      return navigateTo("/");
    }
    return navigateTo(from.fullPath);
  }
});

export { auth as default };
//# sourceMappingURL=auth-a65125e1.mjs.map
