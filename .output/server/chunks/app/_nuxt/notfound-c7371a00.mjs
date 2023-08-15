import { q as defineNuxtRouteMiddleware, s as useRequestEvent, t as setResponseStatus } from '../server.mjs';
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

const notfound = /* @__PURE__ */ defineNuxtRouteMiddleware((to, from) => {
  const event = useRequestEvent();
  setResponseStatus(event, 404, "Page not found");
});

export { notfound as default };
//# sourceMappingURL=notfound-c7371a00.mjs.map
