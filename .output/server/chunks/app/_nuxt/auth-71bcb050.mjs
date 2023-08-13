import { l as useFormStore, s as defineNuxtRouteMiddleware, i as useRoute, t as navigateTo, q as useState, r as useCookie } from '../server.mjs';
import 'vue';
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
import 'unstorage';
import 'radix3';
import 'mongoose';
import 'node:fs';
import 'node:url';
import 'pathe';

function useToken() {
  return useState("token", () => useCookie("token"));
}
const formStore = useFormStore();
const auth = /* @__PURE__ */ defineNuxtRouteMiddleware((to, from) => {
  const token = useToken();
  useRoute();
  if (!token.value) {
    formStore.toggleForm();
    return navigateTo({ path: "/" });
  }
});

export { auth as default };
//# sourceMappingURL=auth-71bcb050.mjs.map
