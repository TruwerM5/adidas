import { s as defineNuxtRouteMiddleware, v as useRequestEvent, w as setResponseStatus } from '../server.mjs';
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

const notfound = /* @__PURE__ */ defineNuxtRouteMiddleware((to, from) => {
  const event = useRequestEvent();
  setResponseStatus(event, 404);
});

export { notfound as default };
//# sourceMappingURL=notfound-3dbc381c.mjs.map
