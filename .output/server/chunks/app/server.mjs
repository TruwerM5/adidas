import { toRef, isRef, hasInjectionContext, inject, version, ref, watchEffect, watch, getCurrentInstance, onServerPrefetch, defineComponent, unref, computed, h, resolveComponent, useSSRContext, mergeProps, withCtx, createVNode, toDisplayString, openBlock, createBlock, createApp, reactive, createTextVNode, effectScope, isReactive, toRaw, provide, onErrorCaptured, resolveDynamicComponent, shallowRef, shallowReactive, isReadonly, getCurrentScope, onScopeDispose, nextTick, defineAsyncComponent, markRaw, toRefs, isShallow, createCommentVNode, Fragment, Suspense, Transition } from 'vue';
import { $fetch as $fetch$1 } from 'ofetch';
import { createHooks } from 'hookable';
import { getContext, executeAsync } from 'unctx';
import { createMemoryHistory, createRouter, START_LOCATION, RouterView } from 'vue-router';
import { createError as createError$1, setResponseStatus as setResponseStatus$1, sanitizeStatusCode, setCookie, getCookie, deleteCookie } from 'h3';
import { withQuery, hasProtocol, parseURL, joinURL, parseQuery, withTrailingSlash, withoutTrailingSlash } from 'ufo';
import destr from 'destr';
import { renderSSRHead } from '@unhead/ssr';
import { getActiveHead, createServerHead as createServerHead$1 } from 'unhead';
import { defineHeadPlugin, composableNames } from '@unhead/shared';
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderAttrs, ssrRenderClass, ssrRenderList, ssrRenderSuspense, ssrRenderVNode } from 'vue/server-renderer';
import { parse } from 'cookie-es';
import { isEqual } from 'ohash';
import { defu } from 'defu';
import { u as useRuntimeConfig$1 } from '../nitro/node-server.mjs';
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

const appConfig = useRuntimeConfig$1().app;
const baseURL = () => appConfig.baseURL;
const nuxtAppCtx = /* @__PURE__ */ getContext("nuxt-app");
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
  let hydratingCount = 0;
  const nuxtApp = {
    provide: void 0,
    globalName: "nuxt",
    versions: {
      get nuxt() {
        return "3.6.5";
      },
      get vue() {
        return nuxtApp.vueApp.version;
      }
    },
    payload: reactive({
      data: {},
      state: {},
      _errors: {},
      ...{ serverRendered: true }
    }),
    static: {
      data: {}
    },
    runWithContext: (fn) => callWithNuxt(nuxtApp, fn),
    isHydrating: false,
    deferHydration() {
      if (!nuxtApp.isHydrating) {
        return () => {
        };
      }
      hydratingCount++;
      let called = false;
      return () => {
        if (called) {
          return;
        }
        called = true;
        hydratingCount--;
        if (hydratingCount === 0) {
          nuxtApp.isHydrating = false;
          return nuxtApp.callHook("app:suspense:resolve");
        }
      };
    },
    _asyncDataPromises: {},
    _asyncData: {},
    _payloadRevivers: {},
    ...options
  };
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  {
    async function contextCaller(hooks, args) {
      for (const hook of hooks) {
        await nuxtApp.runWithContext(() => hook(...args));
      }
    }
    nuxtApp.hooks.callHook = (name, ...args) => nuxtApp.hooks.callHookWith(contextCaller, name, ...args);
  }
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter(nuxtApp, $name, value);
    defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  {
    if (nuxtApp.ssrContext) {
      nuxtApp.ssrContext.nuxt = nuxtApp;
      nuxtApp.ssrContext._payloadReducers = {};
      nuxtApp.payload.path = nuxtApp.ssrContext.url;
    }
    nuxtApp.ssrContext = nuxtApp.ssrContext || {};
    if (nuxtApp.ssrContext.payload) {
      Object.assign(nuxtApp.payload, nuxtApp.ssrContext.payload);
    }
    nuxtApp.ssrContext.payload = nuxtApp.payload;
    nuxtApp.ssrContext.config = {
      public: options.ssrContext.runtimeConfig.public,
      app: options.ssrContext.runtimeConfig.app
    };
  }
  const runtimeConfig = options.ssrContext.runtimeConfig;
  nuxtApp.provide("config", runtimeConfig);
  return nuxtApp;
}
async function applyPlugin(nuxtApp, plugin2) {
  if (plugin2.hooks) {
    nuxtApp.hooks.addHooks(plugin2.hooks);
  }
  if (typeof plugin2 === "function") {
    const { provide: provide2 } = await nuxtApp.runWithContext(() => plugin2(nuxtApp)) || {};
    if (provide2 && typeof provide2 === "object") {
      for (const key in provide2) {
        nuxtApp.provide(key, provide2[key]);
      }
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  const parallels = [];
  const errors = [];
  for (const plugin2 of plugins2) {
    const promise = applyPlugin(nuxtApp, plugin2);
    if (plugin2.parallel) {
      parallels.push(promise.catch((e) => errors.push(e)));
    } else {
      await promise;
    }
  }
  await Promise.all(parallels);
  if (errors.length) {
    throw errors[0];
  }
}
/*! @__NO_SIDE_EFFECTS__ */
function defineNuxtPlugin(plugin2) {
  if (typeof plugin2 === "function") {
    return plugin2;
  }
  delete plugin2.name;
  return Object.assign(plugin2.setup || (() => {
  }), plugin2, { [NuxtPluginIndicator]: true });
}
function callWithNuxt(nuxt, setup, args) {
  const fn = () => args ? setup(...args) : setup();
  {
    return nuxt.vueApp.runWithContext(() => nuxtAppCtx.callAsync(nuxt, fn));
  }
}
/*! @__NO_SIDE_EFFECTS__ */
function useNuxtApp() {
  var _a;
  let nuxtAppInstance;
  if (hasInjectionContext()) {
    nuxtAppInstance = (_a = getCurrentInstance()) == null ? void 0 : _a.appContext.app.$nuxt;
  }
  nuxtAppInstance = nuxtAppInstance || nuxtAppCtx.tryUse();
  if (!nuxtAppInstance) {
    {
      throw new Error("[nuxt] instance unavailable");
    }
  }
  return nuxtAppInstance;
}
/*! @__NO_SIDE_EFFECTS__ */
function useRuntimeConfig() {
  return useNuxtApp().$config;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
const useStateKeyPrefix = "$s";
function useState(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  const [_key, init] = args;
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useState] key must be a string: " + _key);
  }
  if (init !== void 0 && typeof init !== "function") {
    throw new Error("[nuxt] [useState] init must be a function: " + init);
  }
  const key = useStateKeyPrefix + _key;
  const nuxt = useNuxtApp();
  const state = toRef(nuxt.payload.state, key);
  if (state.value === void 0 && init) {
    const initialValue = init();
    if (isRef(initialValue)) {
      nuxt.payload.state[key] = initialValue;
      return initialValue;
    }
    state.value = initialValue;
  }
  return state;
}
const LayoutMetaSymbol = Symbol("layout-meta");
const PageRouteSymbol = Symbol("route");
const useRouter = () => {
  var _a;
  return (_a = useNuxtApp()) == null ? void 0 : _a.$router;
};
const useRoute = () => {
  if (hasInjectionContext()) {
    return inject(PageRouteSymbol, useNuxtApp()._route);
  }
  return useNuxtApp()._route;
};
/*! @__NO_SIDE_EFFECTS__ */
function defineNuxtRouteMiddleware(middleware) {
  return middleware;
}
const isProcessingMiddleware = () => {
  try {
    if (useNuxtApp()._processingMiddleware) {
      return true;
    }
  } catch {
    return true;
  }
  return false;
};
const navigateTo = (to, options) => {
  if (!to) {
    to = "/";
  }
  const toPath = typeof to === "string" ? to : withQuery(to.path || "/", to.query || {}) + (to.hash || "");
  if (options == null ? void 0 : options.open) {
    return Promise.resolve();
  }
  const isExternal = (options == null ? void 0 : options.external) || hasProtocol(toPath, { acceptRelative: true });
  if (isExternal && !(options == null ? void 0 : options.external)) {
    throw new Error("Navigating to external URL is not allowed by default. Use `navigateTo (url, { external: true })`.");
  }
  if (isExternal && parseURL(toPath).protocol === "script:") {
    throw new Error("Cannot navigate to an URL with script protocol.");
  }
  const inMiddleware = isProcessingMiddleware();
  const router = useRouter();
  const nuxtApp = useNuxtApp();
  {
    if (nuxtApp.ssrContext) {
      const fullPath = typeof to === "string" || isExternal ? toPath : router.resolve(to).fullPath || "/";
      const location2 = isExternal ? toPath : joinURL(useRuntimeConfig().app.baseURL, fullPath);
      async function redirect(response) {
        await nuxtApp.callHook("app:redirected");
        const encodedLoc = location2.replace(/"/g, "%22");
        nuxtApp.ssrContext._renderResponse = {
          statusCode: sanitizeStatusCode((options == null ? void 0 : options.redirectCode) || 302, 302),
          body: `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`,
          headers: { location: location2 }
        };
        return response;
      }
      if (!isExternal && inMiddleware) {
        router.afterEach((final) => final.fullPath === fullPath ? redirect(false) : void 0);
        return to;
      }
      return redirect(!inMiddleware ? void 0 : (
        /* abort route navigation */
        false
      ));
    }
  }
  if (isExternal) {
    if (options == null ? void 0 : options.replace) {
      location.replace(toPath);
    } else {
      location.href = toPath;
    }
    if (inMiddleware) {
      if (!nuxtApp.isHydrating) {
        return false;
      }
      return new Promise(() => {
      });
    }
    return Promise.resolve();
  }
  return (options == null ? void 0 : options.replace) ? router.replace(to) : router.push(to);
};
const useError = () => toRef(useNuxtApp().payload, "error");
const showError = (_err) => {
  const err = createError(_err);
  try {
    const nuxtApp = useNuxtApp();
    const error = useError();
    if (false)
      ;
    error.value = error.value || err;
  } catch {
    throw err;
  }
  return err;
};
const isNuxtError = (err) => !!(err && typeof err === "object" && "__nuxt_error" in err);
const createError = (err) => {
  const _err = createError$1(err);
  _err.__nuxt_error = true;
  return _err;
};
const __nuxt_page_meta$2 = {
  middleware: "auth"
};
const __nuxt_page_meta$1 = {
  middleware: "auth"
};
const __nuxt_page_meta = {
  middleware: "auth"
};
const _routes = [
  {
    name: (__nuxt_page_meta$2 == null ? void 0 : __nuxt_page_meta$2.name) ?? "cart",
    path: (__nuxt_page_meta$2 == null ? void 0 : __nuxt_page_meta$2.path) ?? "/cart",
    meta: __nuxt_page_meta$2 || {},
    alias: (__nuxt_page_meta$2 == null ? void 0 : __nuxt_page_meta$2.alias) || [],
    redirect: (__nuxt_page_meta$2 == null ? void 0 : __nuxt_page_meta$2.redirect) || void 0,
    component: () => import('./_nuxt/cart-8c5343ef.mjs').then((m) => m.default || m)
  },
  {
    name: (__nuxt_page_meta$1 == null ? void 0 : __nuxt_page_meta$1.name) ?? "checkout",
    path: (__nuxt_page_meta$1 == null ? void 0 : __nuxt_page_meta$1.path) ?? "/checkout",
    meta: __nuxt_page_meta$1 || {},
    alias: (__nuxt_page_meta$1 == null ? void 0 : __nuxt_page_meta$1.alias) || [],
    redirect: (__nuxt_page_meta$1 == null ? void 0 : __nuxt_page_meta$1.redirect) || void 0,
    component: () => import('./_nuxt/checkout-2455a8bb.mjs').then((m) => m.default || m)
  },
  {
    name: "collection-collection",
    path: "/collection/:collection()",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/_collection_-17bf483a.mjs').then((m) => m.default || m)
  },
  {
    name: "index",
    path: "/",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/index-8d7028b0.mjs').then((m) => m.default || m)
  },
  {
    name: "men",
    path: "/men",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/men-de25da96.mjs').then((m) => m.default || m)
  },
  {
    name: "popular-name",
    path: "/popular/:name()",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/_name_-80eef19c.mjs').then((m) => m.default || m)
  },
  {
    name: "products-code",
    path: "/products/:code()",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/_code_-c886275f.mjs').then((m) => m.default || m)
  },
  {
    name: (__nuxt_page_meta == null ? void 0 : __nuxt_page_meta.name) ?? "wishlist",
    path: (__nuxt_page_meta == null ? void 0 : __nuxt_page_meta.path) ?? "/wishlist",
    meta: __nuxt_page_meta || {},
    alias: (__nuxt_page_meta == null ? void 0 : __nuxt_page_meta.alias) || [],
    redirect: (__nuxt_page_meta == null ? void 0 : __nuxt_page_meta.redirect) || void 0,
    component: () => import('./_nuxt/wishlist-bbc2f44a.mjs').then((m) => m.default || m)
  },
  {
    name: "women",
    path: "/women",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/women-20ae699c.mjs').then((m) => m.default || m)
  }
];
const appHead = { "meta": [{ "name": "viewport", "content": "width=device-width, initial-scale=1" }, { "charset": "utf-8" }, { "name": "lang", "content": "en" }], "link": [], "style": [], "script": [], "noscript": [], "title": "Adidas" };
const appPageTransition = false;
const appKeepalive = false;
const routerOptions0 = {
  scrollBehavior(to, from, savedPosition) {
    const nuxtApp = useNuxtApp();
    let position = savedPosition || void 0;
    if (!position && from && to && to.meta.scrollToTop !== false && _isDifferentRoute(from, to)) {
      position = { left: 0, top: 0 };
    }
    if (to.path === from.path) {
      if (from.hash && !to.hash) {
        return { left: 0, top: 0 };
      }
      if (to.hash) {
        return { el: to.hash, top: _getHashElementScrollMarginTop(to.hash) };
      }
    }
    const hasTransition = (route) => !!(route.meta.pageTransition ?? appPageTransition);
    const hookToWait = hasTransition(from) && hasTransition(to) ? "page:transition:finish" : "page:finish";
    return new Promise((resolve) => {
      nuxtApp.hooks.hookOnce(hookToWait, async () => {
        await nextTick();
        if (to.hash) {
          position = { el: to.hash, top: _getHashElementScrollMarginTop(to.hash) };
        }
        resolve(position);
      });
    });
  }
};
function _getHashElementScrollMarginTop(selector) {
  try {
    const elem = document.querySelector(selector);
    if (elem) {
      return parseFloat(getComputedStyle(elem).scrollMarginTop);
    }
  } catch {
  }
  return 0;
}
function _isDifferentRoute(from, to) {
  const samePageComponent = to.matched.every((comp, index) => {
    var _a, _b, _c;
    return ((_a = comp.components) == null ? void 0 : _a.default) === ((_c = (_b = from.matched[index]) == null ? void 0 : _b.components) == null ? void 0 : _c.default);
  });
  if (!samePageComponent) {
    return true;
  }
  if (samePageComponent && JSON.stringify(from.params) !== JSON.stringify(to.params)) {
    return true;
  }
  return false;
}
const configRouterOptions = {};
const routerOptions = {
  ...configRouterOptions,
  ...routerOptions0
};
const validate = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to) => {
  var _a;
  let __temp, __restore;
  if (!((_a = to.meta) == null ? void 0 : _a.validate)) {
    return;
  }
  useRouter();
  const result = ([__temp, __restore] = executeAsync(() => Promise.resolve(to.meta.validate(to))), __temp = await __temp, __restore(), __temp);
  if (result === true) {
    return;
  }
  {
    return result;
  }
});
const globalMiddleware = [
  validate
];
const namedMiddleware = {
  auth: () => import('./_nuxt/auth-a65125e1.mjs'),
  notfound: () => import('./_nuxt/notfound-c7371a00.mjs')
};
const plugin$1 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:router",
  enforce: "pre",
  async setup(nuxtApp) {
    var _a, _b;
    let __temp, __restore;
    let routerBase = useRuntimeConfig().app.baseURL;
    if (routerOptions.hashMode && !routerBase.includes("#")) {
      routerBase += "#";
    }
    const history = ((_a = routerOptions.history) == null ? void 0 : _a.call(routerOptions, routerBase)) ?? createMemoryHistory(routerBase);
    const routes = ((_b = routerOptions.routes) == null ? void 0 : _b.call(routerOptions, _routes)) ?? _routes;
    let startPosition;
    const initialURL = nuxtApp.ssrContext.url;
    const router = createRouter({
      ...routerOptions,
      scrollBehavior: (to, from, savedPosition) => {
        var _a2;
        if (from === START_LOCATION) {
          startPosition = savedPosition;
          return;
        }
        router.options.scrollBehavior = routerOptions.scrollBehavior;
        return (_a2 = routerOptions.scrollBehavior) == null ? void 0 : _a2.call(routerOptions, to, START_LOCATION, startPosition || savedPosition);
      },
      history,
      routes
    });
    nuxtApp.vueApp.use(router);
    const previousRoute = shallowRef(router.currentRoute.value);
    router.afterEach((_to, from) => {
      previousRoute.value = from;
    });
    Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", {
      get: () => previousRoute.value
    });
    const _route = shallowRef(router.resolve(initialURL));
    const syncCurrentRoute = () => {
      _route.value = router.currentRoute.value;
    };
    nuxtApp.hook("page:finish", syncCurrentRoute);
    router.afterEach((to, from) => {
      var _a2, _b2, _c, _d;
      if (((_b2 = (_a2 = to.matched[0]) == null ? void 0 : _a2.components) == null ? void 0 : _b2.default) === ((_d = (_c = from.matched[0]) == null ? void 0 : _c.components) == null ? void 0 : _d.default)) {
        syncCurrentRoute();
      }
    });
    const route = {};
    for (const key in _route.value) {
      Object.defineProperty(route, key, {
        get: () => _route.value[key]
      });
    }
    nuxtApp._route = shallowReactive(route);
    nuxtApp._middleware = nuxtApp._middleware || {
      global: [],
      named: {}
    };
    useError();
    try {
      if (true) {
        ;
        [__temp, __restore] = executeAsync(() => router.push(initialURL)), await __temp, __restore();
        ;
      }
      ;
      [__temp, __restore] = executeAsync(() => router.isReady()), await __temp, __restore();
      ;
    } catch (error2) {
      [__temp, __restore] = executeAsync(() => nuxtApp.runWithContext(() => showError(error2))), await __temp, __restore();
    }
    const initialLayout = useState("_layout");
    router.beforeEach(async (to, from) => {
      var _a2, _b2;
      to.meta = reactive(to.meta);
      if (nuxtApp.isHydrating && initialLayout.value && !isReadonly(to.meta.layout)) {
        to.meta.layout = initialLayout.value;
      }
      nuxtApp._processingMiddleware = true;
      if (!((_a2 = nuxtApp.ssrContext) == null ? void 0 : _a2.islandContext)) {
        const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
        for (const component of to.matched) {
          const componentMiddleware = component.meta.middleware;
          if (!componentMiddleware) {
            continue;
          }
          if (Array.isArray(componentMiddleware)) {
            for (const entry2 of componentMiddleware) {
              middlewareEntries.add(entry2);
            }
          } else {
            middlewareEntries.add(componentMiddleware);
          }
        }
        for (const entry2 of middlewareEntries) {
          const middleware = typeof entry2 === "string" ? nuxtApp._middleware.named[entry2] || await ((_b2 = namedMiddleware[entry2]) == null ? void 0 : _b2.call(namedMiddleware).then((r) => r.default || r)) : entry2;
          if (!middleware) {
            throw new Error(`Unknown route middleware: '${entry2}'.`);
          }
          const result = await nuxtApp.runWithContext(() => middleware(to, from));
          {
            if (result === false || result instanceof Error) {
              const error2 = result || createError$1({
                statusCode: 404,
                statusMessage: `Page Not Found: ${initialURL}`
              });
              await nuxtApp.runWithContext(() => showError(error2));
              return false;
            }
          }
          if (result || result === false) {
            return result;
          }
        }
      }
    });
    router.onError(() => {
      delete nuxtApp._processingMiddleware;
    });
    router.afterEach(async (to, _from, failure) => {
      var _a2;
      delete nuxtApp._processingMiddleware;
      if ((failure == null ? void 0 : failure.type) === 4) {
        return;
      }
      if (to.matched.length === 0 && !((_a2 = nuxtApp.ssrContext) == null ? void 0 : _a2.islandContext)) {
        await nuxtApp.runWithContext(() => showError(createError$1({
          statusCode: 404,
          fatal: false,
          statusMessage: `Page not found: ${to.fullPath}`
        })));
      } else if (to.redirectedFrom && to.fullPath !== initialURL) {
        await nuxtApp.runWithContext(() => navigateTo(to.fullPath || "/"));
      }
    });
    nuxtApp.hooks.hookOnce("app:created", async () => {
      try {
        await router.replace({
          ...router.resolve(initialURL),
          name: void 0,
          // #4920, #4982
          force: true
        });
        router.options.scrollBehavior = routerOptions.scrollBehavior;
      } catch (error2) {
        await nuxtApp.runWithContext(() => showError(error2));
      }
    });
    return { provide: { router } };
  }
});
const isVue2 = false;
/*!
 * pinia v2.1.6
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */
let activePinia;
const setActivePinia = (pinia) => activePinia = pinia;
const piniaSymbol = (
  /* istanbul ignore next */
  Symbol()
);
function isPlainObject(o) {
  return o && typeof o === "object" && Object.prototype.toString.call(o) === "[object Object]" && typeof o.toJSON !== "function";
}
var MutationType;
(function(MutationType2) {
  MutationType2["direct"] = "direct";
  MutationType2["patchObject"] = "patch object";
  MutationType2["patchFunction"] = "patch function";
})(MutationType || (MutationType = {}));
function createPinia() {
  const scope = effectScope(true);
  const state = scope.run(() => ref({}));
  let _p = [];
  let toBeInstalled = [];
  const pinia = markRaw({
    install(app) {
      setActivePinia(pinia);
      {
        pinia._a = app;
        app.provide(piniaSymbol, pinia);
        app.config.globalProperties.$pinia = pinia;
        toBeInstalled.forEach((plugin2) => _p.push(plugin2));
        toBeInstalled = [];
      }
    },
    use(plugin2) {
      if (!this._a && !isVue2) {
        toBeInstalled.push(plugin2);
      } else {
        _p.push(plugin2);
      }
      return this;
    },
    _p,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: scope,
    _s: /* @__PURE__ */ new Map(),
    state
  });
  return pinia;
}
const noop = () => {
};
function addSubscription(subscriptions, callback, detached, onCleanup = noop) {
  subscriptions.push(callback);
  const removeSubscription = () => {
    const idx = subscriptions.indexOf(callback);
    if (idx > -1) {
      subscriptions.splice(idx, 1);
      onCleanup();
    }
  };
  if (!detached && getCurrentScope()) {
    onScopeDispose(removeSubscription);
  }
  return removeSubscription;
}
function triggerSubscriptions(subscriptions, ...args) {
  subscriptions.slice().forEach((callback) => {
    callback(...args);
  });
}
const fallbackRunWithContext = (fn) => fn();
function mergeReactiveObjects(target, patchToApply) {
  if (target instanceof Map && patchToApply instanceof Map) {
    patchToApply.forEach((value, key) => target.set(key, value));
  }
  if (target instanceof Set && patchToApply instanceof Set) {
    patchToApply.forEach(target.add, target);
  }
  for (const key in patchToApply) {
    if (!patchToApply.hasOwnProperty(key))
      continue;
    const subPatch = patchToApply[key];
    const targetValue = target[key];
    if (isPlainObject(targetValue) && isPlainObject(subPatch) && target.hasOwnProperty(key) && !isRef(subPatch) && !isReactive(subPatch)) {
      target[key] = mergeReactiveObjects(targetValue, subPatch);
    } else {
      target[key] = subPatch;
    }
  }
  return target;
}
const skipHydrateSymbol = (
  /* istanbul ignore next */
  Symbol()
);
function shouldHydrate(obj) {
  return !isPlainObject(obj) || !obj.hasOwnProperty(skipHydrateSymbol);
}
const { assign } = Object;
function isComputed(o) {
  return !!(isRef(o) && o.effect);
}
function createOptionsStore(id, options, pinia, hot) {
  const { state, actions, getters } = options;
  const initialState = pinia.state.value[id];
  let store;
  function setup() {
    if (!initialState && (!("production" !== "production") )) {
      {
        pinia.state.value[id] = state ? state() : {};
      }
    }
    const localState = toRefs(pinia.state.value[id]);
    return assign(localState, actions, Object.keys(getters || {}).reduce((computedGetters, name) => {
      computedGetters[name] = markRaw(computed(() => {
        setActivePinia(pinia);
        const store2 = pinia._s.get(id);
        return getters[name].call(store2, store2);
      }));
      return computedGetters;
    }, {}));
  }
  store = createSetupStore(id, setup, options, pinia, hot, true);
  return store;
}
function createSetupStore($id, setup, options = {}, pinia, hot, isOptionsStore) {
  let scope;
  const optionsForPlugin = assign({ actions: {} }, options);
  const $subscribeOptions = {
    deep: true
    // flush: 'post',
  };
  let isListening;
  let isSyncListening;
  let subscriptions = [];
  let actionSubscriptions = [];
  let debuggerEvents;
  const initialState = pinia.state.value[$id];
  if (!isOptionsStore && !initialState && (!("production" !== "production") )) {
    {
      pinia.state.value[$id] = {};
    }
  }
  ref({});
  let activeListener;
  function $patch(partialStateOrMutator) {
    let subscriptionMutation;
    isListening = isSyncListening = false;
    if (typeof partialStateOrMutator === "function") {
      partialStateOrMutator(pinia.state.value[$id]);
      subscriptionMutation = {
        type: MutationType.patchFunction,
        storeId: $id,
        events: debuggerEvents
      };
    } else {
      mergeReactiveObjects(pinia.state.value[$id], partialStateOrMutator);
      subscriptionMutation = {
        type: MutationType.patchObject,
        payload: partialStateOrMutator,
        storeId: $id,
        events: debuggerEvents
      };
    }
    const myListenerId = activeListener = Symbol();
    nextTick().then(() => {
      if (activeListener === myListenerId) {
        isListening = true;
      }
    });
    isSyncListening = true;
    triggerSubscriptions(subscriptions, subscriptionMutation, pinia.state.value[$id]);
  }
  const $reset = isOptionsStore ? function $reset2() {
    const { state } = options;
    const newState = state ? state() : {};
    this.$patch(($state) => {
      assign($state, newState);
    });
  } : (
    /* istanbul ignore next */
    noop
  );
  function $dispose() {
    scope.stop();
    subscriptions = [];
    actionSubscriptions = [];
    pinia._s.delete($id);
  }
  function wrapAction(name, action) {
    return function() {
      setActivePinia(pinia);
      const args = Array.from(arguments);
      const afterCallbackList = [];
      const onErrorCallbackList = [];
      function after(callback) {
        afterCallbackList.push(callback);
      }
      function onError(callback) {
        onErrorCallbackList.push(callback);
      }
      triggerSubscriptions(actionSubscriptions, {
        args,
        name,
        store,
        after,
        onError
      });
      let ret;
      try {
        ret = action.apply(this && this.$id === $id ? this : store, args);
      } catch (error) {
        triggerSubscriptions(onErrorCallbackList, error);
        throw error;
      }
      if (ret instanceof Promise) {
        return ret.then((value) => {
          triggerSubscriptions(afterCallbackList, value);
          return value;
        }).catch((error) => {
          triggerSubscriptions(onErrorCallbackList, error);
          return Promise.reject(error);
        });
      }
      triggerSubscriptions(afterCallbackList, ret);
      return ret;
    };
  }
  const partialStore = {
    _p: pinia,
    // _s: scope,
    $id,
    $onAction: addSubscription.bind(null, actionSubscriptions),
    $patch,
    $reset,
    $subscribe(callback, options2 = {}) {
      const removeSubscription = addSubscription(subscriptions, callback, options2.detached, () => stopWatcher());
      const stopWatcher = scope.run(() => watch(() => pinia.state.value[$id], (state) => {
        if (options2.flush === "sync" ? isSyncListening : isListening) {
          callback({
            storeId: $id,
            type: MutationType.direct,
            events: debuggerEvents
          }, state);
        }
      }, assign({}, $subscribeOptions, options2)));
      return removeSubscription;
    },
    $dispose
  };
  const store = reactive(partialStore);
  pinia._s.set($id, store);
  const runWithContext = pinia._a && pinia._a.runWithContext || fallbackRunWithContext;
  const setupStore = pinia._e.run(() => {
    scope = effectScope();
    return runWithContext(() => scope.run(setup));
  });
  for (const key in setupStore) {
    const prop = setupStore[key];
    if (isRef(prop) && !isComputed(prop) || isReactive(prop)) {
      if (!isOptionsStore) {
        if (initialState && shouldHydrate(prop)) {
          if (isRef(prop)) {
            prop.value = initialState[key];
          } else {
            mergeReactiveObjects(prop, initialState[key]);
          }
        }
        {
          pinia.state.value[$id][key] = prop;
        }
      }
    } else if (typeof prop === "function") {
      const actionValue = wrapAction(key, prop);
      {
        setupStore[key] = actionValue;
      }
      optionsForPlugin.actions[key] = prop;
    } else ;
  }
  {
    assign(store, setupStore);
    assign(toRaw(store), setupStore);
  }
  Object.defineProperty(store, "$state", {
    get: () => pinia.state.value[$id],
    set: (state) => {
      $patch(($state) => {
        assign($state, state);
      });
    }
  });
  pinia._p.forEach((extender) => {
    {
      assign(store, scope.run(() => extender({
        store,
        app: pinia._a,
        pinia,
        options: optionsForPlugin
      })));
    }
  });
  if (initialState && isOptionsStore && options.hydrate) {
    options.hydrate(store.$state, initialState);
  }
  isListening = true;
  isSyncListening = true;
  return store;
}
function defineStore(idOrOptions, setup, setupOptions) {
  let id;
  let options;
  const isSetupStore = typeof setup === "function";
  if (typeof idOrOptions === "string") {
    id = idOrOptions;
    options = isSetupStore ? setupOptions : setup;
  } else {
    options = idOrOptions;
    id = idOrOptions.id;
  }
  function useStore(pinia, hot) {
    const hasContext = hasInjectionContext();
    pinia = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (pinia) || (hasContext ? inject(piniaSymbol, null) : null);
    if (pinia)
      setActivePinia(pinia);
    pinia = activePinia;
    if (!pinia._s.has(id)) {
      if (isSetupStore) {
        createSetupStore(id, setup, options, pinia);
      } else {
        createOptionsStore(id, options, pinia);
      }
    }
    const store = pinia._s.get(id);
    return store;
  }
  useStore.$id = id;
  return useStore;
}
const Vue3 = version.startsWith("3");
function resolveUnref(r) {
  return typeof r === "function" ? r() : unref(r);
}
function resolveUnrefHeadInput(ref2, lastKey = "") {
  if (ref2 instanceof Promise)
    return ref2;
  const root = resolveUnref(ref2);
  if (!ref2 || !root)
    return root;
  if (Array.isArray(root))
    return root.map((r) => resolveUnrefHeadInput(r, lastKey));
  if (typeof root === "object") {
    return Object.fromEntries(
      Object.entries(root).map(([k, v]) => {
        if (k === "titleTemplate" || k.startsWith("on"))
          return [k, unref(v)];
        return [k, resolveUnrefHeadInput(v, k)];
      })
    );
  }
  return root;
}
const VueReactivityPlugin = defineHeadPlugin({
  hooks: {
    "entries:resolve": function(ctx) {
      for (const entry2 of ctx.entries)
        entry2.resolvedInput = resolveUnrefHeadInput(entry2.input);
    }
  }
});
const headSymbol = "usehead";
function vueInstall(head) {
  const plugin2 = {
    install(app) {
      if (Vue3) {
        app.config.globalProperties.$unhead = head;
        app.config.globalProperties.$head = head;
        app.provide(headSymbol, head);
      }
    }
  };
  return plugin2.install;
}
function createServerHead(options = {}) {
  const head = createServerHead$1(options);
  head.use(VueReactivityPlugin);
  head.install = vueInstall(head);
  return head;
}
function injectHead() {
  return getCurrentInstance() && inject(headSymbol) || getActiveHead();
}
function useHead(input, options = {}) {
  const head = injectHead();
  if (head) {
    if (!head.ssr)
      return clientUseHead(head, input, options);
    return head.push(input, options);
  }
}
function clientUseHead(head, input, options = {}) {
  const deactivated = ref(false);
  const resolvedInput = ref({});
  watchEffect(() => {
    resolvedInput.value = deactivated.value ? {} : resolveUnrefHeadInput(input);
  });
  const entry2 = head.push(resolvedInput.value, options);
  watch(resolvedInput, (e) => {
    entry2.patch(e);
  });
  getCurrentInstance();
  return entry2;
}
const coreComposableNames = [
  "injectHead"
];
({
  "@unhead/vue": [...coreComposableNames, ...composableNames]
});
const getDefault = () => null;
function useAsyncData(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  let [key, handler, options = {}] = args;
  if (typeof key !== "string") {
    throw new TypeError("[nuxt] [asyncData] key must be a string.");
  }
  if (typeof handler !== "function") {
    throw new TypeError("[nuxt] [asyncData] handler must be a function.");
  }
  options.server = options.server ?? true;
  options.default = options.default ?? getDefault;
  options.lazy = options.lazy ?? false;
  options.immediate = options.immediate ?? true;
  const nuxt = useNuxtApp();
  const getCachedData = () => nuxt.isHydrating ? nuxt.payload.data[key] : nuxt.static.data[key];
  const hasCachedData = () => getCachedData() !== void 0;
  if (!nuxt._asyncData[key]) {
    nuxt._asyncData[key] = {
      data: ref(getCachedData() ?? options.default()),
      pending: ref(!hasCachedData()),
      error: toRef(nuxt.payload._errors, key),
      status: ref("idle")
    };
  }
  const asyncData = { ...nuxt._asyncData[key] };
  asyncData.refresh = asyncData.execute = (opts = {}) => {
    if (nuxt._asyncDataPromises[key]) {
      if (opts.dedupe === false) {
        return nuxt._asyncDataPromises[key];
      }
      nuxt._asyncDataPromises[key].cancelled = true;
    }
    if ((opts._initial || nuxt.isHydrating && opts._initial !== false) && hasCachedData()) {
      return getCachedData();
    }
    asyncData.pending.value = true;
    asyncData.status.value = "pending";
    const promise = new Promise(
      (resolve, reject) => {
        try {
          resolve(handler(nuxt));
        } catch (err) {
          reject(err);
        }
      }
    ).then((_result) => {
      if (promise.cancelled) {
        return nuxt._asyncDataPromises[key];
      }
      let result = _result;
      if (options.transform) {
        result = options.transform(_result);
      }
      if (options.pick) {
        result = pick(result, options.pick);
      }
      asyncData.data.value = result;
      asyncData.error.value = null;
      asyncData.status.value = "success";
    }).catch((error) => {
      if (promise.cancelled) {
        return nuxt._asyncDataPromises[key];
      }
      asyncData.error.value = error;
      asyncData.data.value = unref(options.default());
      asyncData.status.value = "error";
    }).finally(() => {
      if (promise.cancelled) {
        return;
      }
      asyncData.pending.value = false;
      nuxt.payload.data[key] = asyncData.data.value;
      if (asyncData.error.value) {
        nuxt.payload._errors[key] = createError(asyncData.error.value);
      }
      delete nuxt._asyncDataPromises[key];
    });
    nuxt._asyncDataPromises[key] = promise;
    return nuxt._asyncDataPromises[key];
  };
  const initialFetch = () => asyncData.refresh({ _initial: true });
  const fetchOnServer = options.server !== false && nuxt.payload.serverRendered;
  if (fetchOnServer && options.immediate) {
    const promise = initialFetch();
    if (getCurrentInstance()) {
      onServerPrefetch(() => promise);
    } else {
      nuxt.hook("app:created", () => promise);
    }
  }
  const asyncDataPromise = Promise.resolve(nuxt._asyncDataPromises[key]).then(() => asyncData);
  Object.assign(asyncDataPromise, asyncData);
  return asyncDataPromise;
}
function pick(obj, keys) {
  const newObj = {};
  for (const key of keys) {
    newObj[key] = obj[key];
  }
  return newObj;
}
function useRequestEvent(nuxtApp = useNuxtApp()) {
  var _a;
  return (_a = nuxtApp.ssrContext) == null ? void 0 : _a.event;
}
function setResponseStatus(arg1, arg2, arg3) {
  if (arg1 && typeof arg1 !== "number") {
    return setResponseStatus$1(arg1, arg2, arg3);
  }
  return setResponseStatus$1(useRequestEvent(), arg1, arg2);
}
const CookieDefaults = {
  path: "/",
  watch: true,
  decode: (val) => destr(decodeURIComponent(val)),
  encode: (val) => encodeURIComponent(typeof val === "string" ? val : JSON.stringify(val))
};
function useCookie(name, _opts) {
  var _a;
  const opts = { ...CookieDefaults, ..._opts };
  const cookies = readRawCookies(opts) || {};
  const cookie = ref(cookies[name] ?? ((_a = opts.default) == null ? void 0 : _a.call(opts)));
  {
    const nuxtApp = useNuxtApp();
    const writeFinalCookieValue = () => {
      if (!isEqual(cookie.value, cookies[name])) {
        writeServerCookie(useRequestEvent(nuxtApp), name, cookie.value, opts);
      }
    };
    const unhook = nuxtApp.hooks.hookOnce("app:rendered", writeFinalCookieValue);
    nuxtApp.hooks.hookOnce("app:error", () => {
      unhook();
      return writeFinalCookieValue();
    });
  }
  return cookie;
}
function readRawCookies(opts = {}) {
  var _a;
  {
    return parse(((_a = useRequestEvent()) == null ? void 0 : _a.node.req.headers.cookie) || "", opts);
  }
}
function writeServerCookie(event, name, value, opts = {}) {
  if (event) {
    if (value !== null && value !== void 0) {
      return setCookie(event, name, value, opts);
    }
    if (getCookie(event, name) !== void 0) {
      return deleteCookie(event, name, opts);
    }
  }
}
function definePayloadReducer(name, reduce) {
  {
    useNuxtApp().ssrContext._payloadReducers[name] = reduce;
  }
}
const firstNonUndefined = (...args) => args.find((arg) => arg !== void 0);
const DEFAULT_EXTERNAL_REL_ATTRIBUTE = "noopener noreferrer";
/*! @__NO_SIDE_EFFECTS__ */
function defineNuxtLink(options) {
  const componentName = options.componentName || "NuxtLink";
  const resolveTrailingSlashBehavior = (to, resolve) => {
    if (!to || options.trailingSlash !== "append" && options.trailingSlash !== "remove") {
      return to;
    }
    const normalizeTrailingSlash = options.trailingSlash === "append" ? withTrailingSlash : withoutTrailingSlash;
    if (typeof to === "string") {
      return normalizeTrailingSlash(to, true);
    }
    const path = "path" in to ? to.path : resolve(to).path;
    return {
      ...to,
      name: void 0,
      // named routes would otherwise always override trailing slash behavior
      path: normalizeTrailingSlash(path, true)
    };
  };
  return /* @__PURE__ */ defineComponent({
    name: componentName,
    props: {
      // Routing
      to: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      href: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      // Attributes
      target: {
        type: String,
        default: void 0,
        required: false
      },
      rel: {
        type: String,
        default: void 0,
        required: false
      },
      noRel: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Prefetching
      prefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      noPrefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Styling
      activeClass: {
        type: String,
        default: void 0,
        required: false
      },
      exactActiveClass: {
        type: String,
        default: void 0,
        required: false
      },
      prefetchedClass: {
        type: String,
        default: void 0,
        required: false
      },
      // Vue Router's `<RouterLink>` additional props
      replace: {
        type: Boolean,
        default: void 0,
        required: false
      },
      ariaCurrentValue: {
        type: String,
        default: void 0,
        required: false
      },
      // Edge cases handling
      external: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Slot API
      custom: {
        type: Boolean,
        default: void 0,
        required: false
      }
    },
    setup(props, { slots }) {
      const router = useRouter();
      const to = computed(() => {
        const path = props.to || props.href || "";
        return resolveTrailingSlashBehavior(path, router.resolve);
      });
      const isExternal = computed(() => {
        if (props.external) {
          return true;
        }
        if (props.target && props.target !== "_self") {
          return true;
        }
        if (typeof to.value === "object") {
          return false;
        }
        return to.value === "" || hasProtocol(to.value, { acceptRelative: true });
      });
      const prefetched = ref(false);
      const el = void 0;
      const elRef = void 0;
      return () => {
        var _a, _b;
        if (!isExternal.value) {
          const routerLinkProps = {
            ref: elRef,
            to: to.value,
            activeClass: props.activeClass || options.activeClass,
            exactActiveClass: props.exactActiveClass || options.exactActiveClass,
            replace: props.replace,
            ariaCurrentValue: props.ariaCurrentValue,
            custom: props.custom
          };
          if (!props.custom) {
            if (prefetched.value) {
              routerLinkProps.class = props.prefetchedClass || options.prefetchedClass;
            }
            routerLinkProps.rel = props.rel;
          }
          return h(
            resolveComponent("RouterLink"),
            routerLinkProps,
            slots.default
          );
        }
        const href = typeof to.value === "object" ? ((_a = router.resolve(to.value)) == null ? void 0 : _a.href) ?? null : to.value || null;
        const target = props.target || null;
        const rel = props.noRel ? null : firstNonUndefined(props.rel, options.externalRelAttribute, href ? DEFAULT_EXTERNAL_REL_ATTRIBUTE : "") || null;
        const navigate = () => navigateTo(href, { replace: props.replace });
        if (props.custom) {
          if (!slots.default) {
            return null;
          }
          return slots.default({
            href,
            navigate,
            get route() {
              if (!href) {
                return void 0;
              }
              const url = parseURL(href);
              return {
                path: url.pathname,
                fullPath: url.pathname,
                get query() {
                  return parseQuery(url.search);
                },
                hash: url.hash,
                // stub properties for compat with vue-router
                params: {},
                name: void 0,
                matched: [],
                redirectedFrom: void 0,
                meta: {},
                href
              };
            },
            rel,
            target,
            isExternal: isExternal.value,
            isActive: false,
            isExactActive: false
          });
        }
        return h("a", { ref: el, href, rel, target }, (_b = slots.default) == null ? void 0 : _b.call(slots));
      };
    }
  });
}
const __nuxt_component_1$2 = /* @__PURE__ */ defineNuxtLink({ componentName: "NuxtLink" });
const plugin = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  const pinia = createPinia();
  nuxtApp.vueApp.use(pinia);
  setActivePinia(pinia);
  {
    nuxtApp.payload.pinia = pinia.state.value;
  }
  return {
    provide: {
      pinia
    }
  };
});
const reducers = {
  NuxtError: (data) => isNuxtError(data) && data.toJSON(),
  EmptyShallowRef: (data) => isRef(data) && isShallow(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_"),
  EmptyRef: (data) => isRef(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_"),
  ShallowRef: (data) => isRef(data) && isShallow(data) && data.value,
  ShallowReactive: (data) => isReactive(data) && isShallow(data) && toRaw(data),
  Ref: (data) => isRef(data) && data.value,
  Reactive: (data) => isReactive(data) && toRaw(data)
};
const revive_payload_server_eJ33V7gbc6 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:revive-payload:server",
  setup() {
    for (const reducer in reducers) {
      definePayloadReducer(reducer, reducers[reducer]);
    }
  }
});
const components_plugin_KR1HBZs4kY = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:global-components"
});
const unhead_KgADcZ0jPj = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:head",
  setup(nuxtApp) {
    const createHead = createServerHead;
    const head = createHead();
    head.push(appHead);
    nuxtApp.vueApp.use(head);
    {
      nuxtApp.ssrContext.renderMeta = async () => {
        const meta = await renderSSRHead(head);
        return {
          ...meta,
          bodyScriptsPrepend: meta.bodyTagsOpen,
          // resolves naming difference with NuxtMeta and Unhead
          bodyScripts: meta.bodyTags
        };
      };
    }
  }
});
const plugins = [
  plugin$1,
  plugin,
  revive_payload_server_eJ33V7gbc6,
  components_plugin_KR1HBZs4kY,
  unhead_KgADcZ0jPj
];
const removeUndefinedProps = (props) => Object.fromEntries(Object.entries(props).filter(([, value]) => value !== void 0));
const setupForUseMeta = (metaFactory, renderChild) => (props, ctx) => {
  useHead(() => metaFactory({ ...removeUndefinedProps(props), ...ctx.attrs }, ctx));
  return () => {
    var _a, _b;
    return renderChild ? (_b = (_a = ctx.slots).default) == null ? void 0 : _b.call(_a) : null;
  };
};
const globalProps = {
  accesskey: String,
  autocapitalize: String,
  autofocus: {
    type: Boolean,
    default: void 0
  },
  class: [String, Object, Array],
  contenteditable: {
    type: Boolean,
    default: void 0
  },
  contextmenu: String,
  dir: String,
  draggable: {
    type: Boolean,
    default: void 0
  },
  enterkeyhint: String,
  exportparts: String,
  hidden: {
    type: Boolean,
    default: void 0
  },
  id: String,
  inputmode: String,
  is: String,
  itemid: String,
  itemprop: String,
  itemref: String,
  itemscope: String,
  itemtype: String,
  lang: String,
  nonce: String,
  part: String,
  slot: String,
  spellcheck: {
    type: Boolean,
    default: void 0
  },
  style: String,
  tabindex: String,
  title: String,
  translate: String
};
const Html = /* @__PURE__ */ defineComponent({
  // eslint-disable-next-line vue/no-reserved-component-names
  name: "Html",
  inheritAttrs: false,
  props: {
    ...globalProps,
    manifest: String,
    version: String,
    xmlns: String,
    renderPriority: [String, Number]
  },
  setup: setupForUseMeta((htmlAttrs) => ({ htmlAttrs }), true)
});
const Body = /* @__PURE__ */ defineComponent({
  // eslint-disable-next-line vue/no-reserved-component-names
  name: "Body",
  inheritAttrs: false,
  props: {
    ...globalProps,
    renderPriority: [String, Number]
  },
  setup: setupForUseMeta((bodyAttrs) => ({ bodyAttrs }), true)
});
const _imports_0$5 = "" + __publicAssetsURL("images/arrow-left.png");
const navbarList = [
  {
    id: 1,
    title: "Men",
    href: "/men"
  },
  {
    id: 2,
    title: "Women",
    href: "/women"
  }
];
const collectionList = [
  {
    id: 1,
    title: "originals"
  },
  {
    id: 2,
    title: "sport"
  },
  {
    id: 3,
    title: "y-3"
  },
  {
    id: 4,
    title: "ultraboost"
  },
  {
    id: 5,
    title: "slides"
  }
];
const useNavStore = defineStore("navbar", {
  state: () => {
    return {
      isNavOpened: false,
      isNavbarVisible: true,
      isCollectionOpened: false,
      isSearchOpened: false,
      navbarList,
      collectionList
    };
  },
  actions: {
    toggleNav() {
      if (this.isNavOpened) {
        this.isCollectionOpened = false;
      }
      this.isNavOpened = !this.isNavOpened;
    },
    toggleCollection() {
      this.isCollectionOpened = !this.isCollectionOpened;
    },
    hideNavbar() {
      this.isNavbarVisible = false;
    },
    showNavbar() {
      this.isNavbarVisible = true;
    },
    toggleSearch() {
      this.isSearchOpened = !this.isSearchOpened;
    }
  }
});
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$9 = {
  __name: "CollectionsList",
  __ssrInlineRender: true,
  setup(__props) {
    const navStore = useNavStore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_1$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "collections__wrapper" }, _attrs))} data-v-2ec28851><div class="${ssrRenderClass(["collections", { "active": unref(navStore).isCollectionOpened }])}" data-v-2ec28851><div class="collections__top" data-v-2ec28851><button class="collections__close-btn" data-v-2ec28851><img${ssrRenderAttr("src", _imports_0$5)} alt="Go back" data-v-2ec28851></button><span class="collections__title" data-v-2ec28851>Collections</span></div><ul class="collections__list" data-v-2ec28851><!--[-->`);
      ssrRenderList(unref(navStore).collectionList, (item) => {
        _push(`<li class="collections__item" data-v-2ec28851>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: { path: "/collection/" + item.title },
          class: "capitalize"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(item.title)}`);
            } else {
              return [
                createTextVNode(toDisplayString(item.title), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</li>`);
      });
      _push(`<!--]--></ul></div></div>`);
    };
  }
};
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CollectionsList.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const __nuxt_component_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-2ec28851"]]);
const useProductsStore = defineStore("products", {
  state: () => {
    return {
      trending: [],
      exclusive: [],
      newArrivals: [],
      allProducts: [],
      men: [],
      women: [],
      menSizes: [6, 6.5, 7, 7.5, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13, 14],
      womenSizes: [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5]
    };
  },
  actions: {
    async getProducts() {
      const { data } = await useAsyncData(() => $fetch("/api/products"), "$Rmf4bWdmSw");
      this.allProducts = data.value;
      this.trending = this.allProducts.filter((item) => item.category === "trending");
      this.exclusive = this.allProducts.filter((item) => item.category === "exclusive");
      this.newArrivals = this.allProducts.filter((item) => item.category === "new");
    },
    getUnique: (arr) => {
      return arr.reduce(
        (res, cur) => res.find((item) => item.name === cur.name) ? res : [...res, cur],
        []
      );
    }
  }
});
const _sfc_main$8 = {
  __name: "Search",
  __ssrInlineRender: true,
  setup(__props) {
    const Nav = useNavStore();
    const Products = useProductsStore();
    const text = ref("");
    const prefiltered = ref([]);
    prefiltered.value = Products.allProducts.map((item) => {
      return {
        name: item.name,
        code: item.code,
        img: item.gallery[0]
      };
    });
    const filtered = ref([]);
    function clear() {
      text.value = "";
      filtered.value = [];
    }
    function clearAndClose() {
      clear();
      Nav.isSearchOpened = false;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_1$2;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["search", { "active": unref(Nav).isSearchOpened }]
      }, _attrs))} data-v-cb7baf11><div class="search__wrapper" data-v-cb7baf11><div class="search__inner relative" data-v-cb7baf11><button class="search__close-btn" data-v-cb7baf11><img${ssrRenderAttr("src", _imports_0$5)} alt="Close" data-v-cb7baf11></button><input type="text" class="search__input" placeholder="Search"${ssrRenderAttr("value", unref(text))} spellcheck="false" data-v-cb7baf11><button class="search__clear-btn text-[12px] lg:text-[16px]" data-v-cb7baf11> clear </button></div>`);
      if (unref(filtered).length > 0) {
        _push(`<div class="search__body ml-[30px] lg:ml-0" data-v-cb7baf11><!--[-->`);
        ssrRenderList(unref(filtered), (item, i) => {
          _push(`<div data-v-cb7baf11>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            onClick: clearAndClose,
            to: { path: "/products/" + item.code },
            class: "flex items-center gap-[10px] my-[10px] lg:text-[20px]"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<img${ssrRenderAttr("src", "/images/products/" + item.img)} alt="" class="max-w-[60px] lg:max-w-[80px]" data-v-cb7baf11${_scopeId}> ${ssrInterpolate(item.name)} - ${ssrInterpolate(item.code)}`);
              } else {
                return [
                  createVNode("img", {
                    src: "/images/products/" + item.img,
                    alt: "",
                    class: "max-w-[60px] lg:max-w-[80px]"
                  }, null, 8, ["src"]),
                  createTextVNode(" " + toDisplayString(item.name) + " - " + toDisplayString(item.code), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Search.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const __nuxt_component_2$3 = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-cb7baf11"]]);
const _imports_0$4 = "" + __publicAssetsURL("images/burger.png");
const _imports_1$1 = "" + __publicAssetsURL("images/logo.svg");
const _imports_0$3 = "" + __publicAssetsURL("images/close-icon.png");
const _imports_1 = "" + __publicAssetsURL("images/wishlist-icon.png");
const _imports_0$2 = "" + __publicAssetsURL("images/wishlist-icon_filled.png");
const _imports_5 = "" + __publicAssetsURL("images/cart-icon.png");
const _imports_6 = "" + __publicAssetsURL("images/search-icon.png");
const _imports_7 = "" + __publicAssetsURL("images/logout-icon.png");
const useFormStore = defineStore("form", {
  state: () => {
    return {
      isFormOpened: false,
      isLogoutOpened: false,
      currentForm: "email",
      email: "",
      password: "",
      errorMsg: "",
      passwordErrorMsg: ""
    };
  },
  actions: {
    toggleForm() {
      this.isFormOpened = !this.isFormOpened;
      this.currentForm = "email";
      this.email = "";
      this.password = "";
      this.errorMsg = "";
      this.passwordErrorMsg = "";
    },
    validateLogin(email) {
      if (!email.includes("@")) {
        this.errorMsg = "Incorrect login, enter correct login please";
        return false;
      }
      return true;
    },
    validatePassword(pass) {
      if (pass.length < 8) {
        this.passwordErrorMsg = "Password must be at least 8 characters long";
        return false;
      }
      return true;
    }
  }
});
const useUserStore = defineStore("user", {
  state: () => {
    return {
      token: useCookie("token").value || "",
      number: 0,
      wishlist: [],
      watched: [],
      cart: [],
      pending: false
    };
  },
  getters: {
    isAuthenticated: (state) => {
      return state.token ? true : false;
    },
    totalSum: (state) => {
      let sum = 0;
      state.cart.forEach((item) => {
        if (item.discount) {
          sum += (item.price - item.price * item.discount / 100) * item.quantity;
        } else {
          sum += item.price * item.quantity;
        }
      });
      return sum;
    },
    totalQuantity: (state) => {
      let count = 0;
      state.cart.forEach((item) => {
        count += +item.quantity;
      });
      return count;
    },
    wishlistQty: (state) => {
      return state.wishlist.length;
    },
    cartQty: (state) => {
      return state.cart.length;
    }
  },
  actions: {
    setToken(wishlist, watchedList) {
      this.token = useCookie("token").value;
      this.wishlist = wishlist;
      this.watched = watchedList;
    },
    logout() {
      this.token = null;
      useCookie("token").value = null;
      navigateTo("/");
      location.reload();
    },
    async initUser() {
      const headers = { "authorization": this.token };
      await useAsyncData("user", () => $fetch("/api/user", {
        headers,
        method: "GET"
      }).then((res) => {
        this.wishlist = res.user.wishlist;
        this.watched = res.user.watchedList;
        this.cart = res.user.cart.products;
      }));
    },
    async loadCart() {
      const { data } = await useAsyncData("cart", () => $fetch("/api/cart", {
        headers: {
          token: this.token
        },
        method: "GET"
      }));
      this.cart = data.value;
      return true;
    },
    async setQuantity(newValue, code, size) {
      const body = {
        token: this.token,
        code,
        quantity: newValue,
        size
      };
      const headers = { "Content-Type": "application/json" };
      await useAsyncData("setQuantity", () => $fetch("/api/products/setQuantity", {
        body,
        headers,
        method: "POST"
      }));
      return true;
    }
  }
});
const _sfc_main$7 = {
  __name: "HeaderVue",
  __ssrInlineRender: true,
  setup(__props) {
    const navStore = useNavStore();
    useFormStore();
    const userStore = useUserStore();
    useProductsStore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_1$2;
      const _component_CollectionsList = __nuxt_component_1$1;
      const _component_Search = __nuxt_component_2$3;
      _push(`<header${ssrRenderAttrs(mergeProps({
        class: ["header", unref(navStore).isNavbarVisible ? "active" : ""]
      }, _attrs))}><div class="header__top h-[45px] bg-black"></div><div class="header__bottom"><nav class="navbar h-[60px] flex items-center px-[10px] lg:px-[20px]"><button class="navbar__toggler mr-auto"><img${ssrRenderAttr("src", _imports_0$4)} alt="Menu toggler button"></button>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "mx-auto md:mx-0",
        onClick: ($event) => _ctx.isNavOpened = false
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", _imports_1$1)} alt="Adidas" class="lg:w-[65px]"${_scopeId}>`);
          } else {
            return [
              createVNode("img", {
                src: _imports_1$1,
                alt: "Adidas",
                class: "lg:w-[65px]"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="${ssrRenderClass(["navbar__nav md:mx-auto", { "active": unref(navStore).isNavOpened }])}"><div class="navbar__top">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "mx-auto",
        onClick: ($event) => unref(navStore).isNavOpened = false
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", _imports_1$1)} alt="Adidas"${_scopeId}>`);
          } else {
            return [
              createVNode("img", {
                src: _imports_1$1,
                alt: "Adidas"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="navbar__close-btn"><img${ssrRenderAttr("src", _imports_0$3)} alt="Close"></button></div><ul class="navbar__list"><!--[-->`);
      ssrRenderList(unref(navStore).navbarList, (item) => {
        _push(`<li class="navbar__item">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: { path: item.href },
          onClick: ($event) => unref(navStore).isNavOpened = false,
          class: "navbar__link"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(item.title)}`);
            } else {
              return [
                createTextVNode(toDisplayString(item.title), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</li>`);
      });
      _push(`<!--]--><li class="navbar__item navbar__item_nested md:relative"><button class="navbar__btn">Collections</button>`);
      _push(ssrRenderComponent(_component_CollectionsList, { class: "collection-list" }, null, _parent));
      _push(`</li></ul></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/wishlist",
        class: "header__wishlist-btn ml-[20px] relative"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(userStore).wishlist.length === 0) {
              _push2(`<img${ssrRenderAttr("src", _imports_1)} alt="Wishlist" class="w-[24px]"${_scopeId}>`);
            } else {
              _push2(`<!--[--><img${ssrRenderAttr("src", _imports_0$2)} alt="Wishlist" class="w-[24px]"${_scopeId}><span class="wishlist-qty absolute text-[12px] left-1/2 -top-[10px]"${_scopeId}>${ssrInterpolate(unref(userStore).wishlist.length)}</span><!--]-->`);
            }
          } else {
            return [
              unref(userStore).wishlist.length === 0 ? (openBlock(), createBlock("img", {
                key: 0,
                src: _imports_1,
                alt: "Wishlist",
                class: "w-[24px]"
              })) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                createVNode("img", {
                  src: _imports_0$2,
                  alt: "Wishlist",
                  class: "w-[24px]"
                }),
                createVNode("span", { class: "wishlist-qty absolute text-[12px] left-1/2 -top-[10px]" }, toDisplayString(unref(userStore).wishlist.length), 1)
              ], 64))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/cart",
        class: "header__cart-btn ml-[20px] relative"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(userStore).cart.length > 0) {
              _push2(`<span class="cart-qty absolute text-[12px] left-1/2 -top-[10px]"${_scopeId}>${ssrInterpolate(unref(userStore).totalQuantity)}</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<img${ssrRenderAttr("src", _imports_5)} alt="Cart" class="w-[24px]"${_scopeId}>`);
          } else {
            return [
              unref(userStore).cart.length > 0 ? (openBlock(), createBlock("span", {
                key: 0,
                class: "cart-qty absolute text-[12px] left-1/2 -top-[10px]"
              }, toDisplayString(unref(userStore).totalQuantity), 1)) : createCommentVNode("", true),
              createVNode("img", {
                src: _imports_5,
                alt: "Cart",
                class: "w-[24px]"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="header__search-btn ml-[20px]"><img${ssrRenderAttr("src", _imports_6)} alt="Search"></button>`);
      _push(ssrRenderComponent(_component_Search, null, null, _parent));
      if (unref(userStore).isAuthenticated) {
        _push(`<button class="header__logout-btn ml-[20px]"><img${ssrRenderAttr("src", _imports_7)} alt="Logout" class="w-[24px]"></button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</nav></div></header>`);
    };
  }
};
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/HeaderVue.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const __nuxt_component_1 = _sfc_main$7;
const interpolatePath = (route, match) => {
  return match.path.replace(/(:\w+)\([^)]+\)/g, "$1").replace(/(:\w+)[?+*]/g, "$1").replace(/:\w+/g, (r) => {
    var _a;
    return ((_a = route.params[r.slice(1)]) == null ? void 0 : _a.toString()) || "";
  });
};
const generateRouteKey = (routeProps, override) => {
  const matchedRoute = routeProps.route.matched.find((m) => {
    var _a;
    return ((_a = m.components) == null ? void 0 : _a.default) === routeProps.Component.type;
  });
  const source = override ?? (matchedRoute == null ? void 0 : matchedRoute.meta.key) ?? (matchedRoute && interpolatePath(routeProps.route, matchedRoute));
  return typeof source === "function" ? source(routeProps.route) : source;
};
const wrapInKeepAlive = (props, children) => {
  return { default: () => children };
};
const RouteProvider = /* @__PURE__ */ defineComponent({
  name: "RouteProvider",
  props: {
    vnode: {
      type: Object,
      required: true
    },
    route: {
      type: Object,
      required: true
    },
    vnodeRef: Object,
    renderKey: String,
    trackRootNodes: Boolean
  },
  setup(props) {
    const previousKey = props.renderKey;
    const previousRoute = props.route;
    const route = {};
    for (const key in props.route) {
      Object.defineProperty(route, key, {
        get: () => previousKey === props.renderKey ? props.route[key] : previousRoute[key]
      });
    }
    provide(PageRouteSymbol, shallowReactive(route));
    return () => {
      return h(props.vnode, { ref: props.vnodeRef });
    };
  }
});
const _wrapIf = (component, props, slots) => {
  props = props === true ? {} : props;
  return { default: () => {
    var _a;
    return props ? h(component, props, slots) : (_a = slots.default) == null ? void 0 : _a.call(slots);
  } };
};
const __nuxt_component_2$2 = /* @__PURE__ */ defineComponent({
  name: "NuxtPage",
  inheritAttrs: false,
  props: {
    name: {
      type: String
    },
    transition: {
      type: [Boolean, Object],
      default: void 0
    },
    keepalive: {
      type: [Boolean, Object],
      default: void 0
    },
    route: {
      type: Object
    },
    pageKey: {
      type: [Function, String],
      default: null
    }
  },
  setup(props, { attrs, expose }) {
    const nuxtApp = useNuxtApp();
    const pageRef = ref();
    inject(PageRouteSymbol, null);
    expose({ pageRef });
    inject(LayoutMetaSymbol, null);
    let vnode;
    const done = nuxtApp.deferHydration();
    return () => {
      return h(RouterView, { name: props.name, route: props.route, ...attrs }, {
        default: (routeProps) => {
          if (!routeProps.Component) {
            return;
          }
          const key = generateRouteKey(routeProps, props.pageKey);
          const hasTransition = !!(props.transition ?? routeProps.route.meta.pageTransition ?? appPageTransition);
          const transitionProps = hasTransition && _mergeTransitionProps([
            props.transition,
            routeProps.route.meta.pageTransition,
            appPageTransition,
            { onAfterLeave: () => {
              nuxtApp.callHook("page:transition:finish", routeProps.Component);
            } }
          ].filter(Boolean));
          vnode = _wrapIf(
            Transition,
            hasTransition && transitionProps,
            wrapInKeepAlive(
              props.keepalive ?? routeProps.route.meta.keepalive ?? appKeepalive,
              h(Suspense, {
                suspensible: true,
                onPending: () => nuxtApp.callHook("page:start", routeProps.Component),
                onResolve: () => {
                  nextTick(() => nuxtApp.callHook("page:finish", routeProps.Component).finally(done));
                }
              }, {
                // @ts-expect-error seems to be an issue in vue types
                default: () => h(RouteProvider, {
                  key,
                  vnode: routeProps.Component,
                  route: routeProps.route,
                  renderKey: key,
                  trackRootNodes: hasTransition,
                  vnodeRef: pageRef
                })
              })
            )
          ).default();
          return vnode;
        }
      });
    };
  }
});
function _toArray(val) {
  return Array.isArray(val) ? val : val ? [val] : [];
}
function _mergeTransitionProps(routeProps) {
  const _props = routeProps.map((prop) => ({
    ...prop,
    onAfterLeave: _toArray(prop.onAfterLeave)
  }));
  return defu(..._props);
}
const _imports_0$1 = "" + __publicAssetsURL("images/arrow-right_white.png");
const _imports_0 = "" + __publicAssetsURL("images/arrow-right.png");
const _sfc_main$6 = {
  __name: "PrimaryBtn",
  __ssrInlineRender: true,
  props: {
    tag: {
      type: String
    },
    path: {
      type: String
    },
    title: {
      type: String
    },
    dark: {
      type: Boolean
    },
    large: {
      type: Boolean
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_1$2;
      if (__props.tag === "link") {
        _push(ssrRenderComponent(_component_NuxtLink, mergeProps({
          to: { path: __props.path },
          class: ["primary-btn", { "primary-btn_dark": __props.dark, "large": __props.large }]
        }, _attrs), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="primary-btn__text" data-v-c505870f${_scopeId}>${ssrInterpolate(__props.title)}</span>`);
              if (__props.dark) {
                _push2(`<img${ssrRenderAttr("src", _imports_0$1)} alt="Arrow" data-v-c505870f${_scopeId}>`);
              } else {
                _push2(`<img${ssrRenderAttr("src", _imports_0)} alt="Arrow" data-v-c505870f${_scopeId}>`);
              }
            } else {
              return [
                createVNode("span", { class: "primary-btn__text" }, toDisplayString(__props.title), 1),
                __props.dark ? (openBlock(), createBlock("img", {
                  key: 0,
                  src: _imports_0$1,
                  alt: "Arrow"
                })) : (openBlock(), createBlock("img", {
                  key: 1,
                  src: _imports_0,
                  alt: "Arrow"
                }))
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<button${ssrRenderAttrs(mergeProps({
          class: ["primary-btn", { "primary-btn_dark": __props.dark, "large": __props.large }]
        }, _attrs))} data-v-c505870f><span class="primary-btn__text" data-v-c505870f>${ssrInterpolate(__props.title)}</span>`);
        if (__props.dark) {
          _push(`<img${ssrRenderAttr("src", _imports_0$1)} alt="Arrow" data-v-c505870f>`);
        } else {
          _push(`<img${ssrRenderAttr("src", _imports_0)} alt="Arrow" data-v-c505870f>`);
        }
        _push(`</button>`);
      }
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/PrimaryBtn.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __nuxt_component_2$1 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-c505870f"]]);
const _sfc_main$5 = {
  __name: "Auth",
  __ssrInlineRender: true,
  setup(__props) {
    const formStore = useFormStore();
    const userStore = useUserStore();
    async function authProcess() {
      if (!formStore.validateLogin(formStore.email)) {
        return;
      }
      const headers = { "Content-Type": "application/json; charset=utf-8" };
      await useAsyncData("users", () => $fetch("/api/users", {
        headers,
        body: formStore.email,
        method: "POST"
      }).then((res) => {
        if (res.exists) {
          formStore.currentForm = "login";
        } else {
          formStore.currentForm = "signup";
        }
      }));
    }
    async function signUpProcess() {
      if (!formStore.validatePassword(formStore.password)) {
        return;
      }
      const headers = { "Content-Type": "application/json" };
      await $fetch("/api/signup", {
        method: "POST",
        headers,
        body: { email: formStore.email, password: formStore.password }
      }).then(() => {
        location.reload();
      });
    }
    async function login() {
      const headers = { "Content-Type": "application/json" };
      await $fetch("/api/login", {
        method: "POST",
        headers,
        body: { email: formStore.email, password: formStore.password }
      }).then((res) => {
        if (res.err) {
          formStore.passwordErrorMsg = res.err;
          return;
        } else {
          userStore.setToken(res.user.wishlist, res.user.watchedList);
          location.reload();
        }
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PrimaryBtn = __nuxt_component_2$1;
      if (unref(formStore).isFormOpened) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "overlay" }, _attrs))} data-v-9e8d456f><form class="auth" data-v-9e8d456f><button class="auth__close-btn" type="button" data-v-9e8d456f><img${ssrRenderAttr("src", _imports_0$3)} alt="Close" data-v-9e8d456f></button><div class="auth__inner" data-v-9e8d456f>`);
        if (unref(formStore).currentForm === "email") {
          _push(`<!--[--><h3 class="auth__title" data-v-9e8d456f>YOUR ADICLUB BENEFITS AWAIT!</h3><span class="auth__text" data-v-9e8d456f> Get free shipping, discount vouchers and members only products when you’re in adiClub </span><h4 class="auth__subtitle" data-v-9e8d456f>LOG IN OR SIGN UP (IT&#39;S FREE)</h4><label for="email" class="auth__label" data-v-9e8d456f>Enter your email to access or create your account</label><div class="auth__input-group" data-v-9e8d456f><input type="text" name="email" class="auth__input"${ssrRenderAttr("value", unref(formStore).email)} data-v-9e8d456f><span class="${ssrRenderClass(["auth__input-label", { decreased: unref(formStore).email.length }])}" data-v-9e8d456f>Email</span>`);
          if (unref(formStore).errorMsg.length) {
            _push(`<span class="text-red-500 absolute top-full left-0" data-v-9e8d456f>${ssrInterpolate(unref(formStore).errorMsg)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
          _push(ssrRenderComponent(_component_PrimaryBtn, {
            tag: "button",
            title: "Continue",
            dark: true,
            class: "large",
            type: "button",
            onClick: authProcess
          }, null, _parent));
          _push(`<!--]-->`);
        } else if (unref(formStore).currentForm === "signup") {
          _push(`<!--[--><h3 class="auth__title" data-v-9e8d456f>WELCOME TO ADICLUB!</h3><span class="auth__text" data-v-9e8d456f> Create a password to have full access to adiClub benefits and be able to redeem points, save your shipping details and more. </span><label for="password" class="auth__label" data-v-9e8d456f>Enter your email to access or create your account</label><div class="auth__input-group" data-v-9e8d456f><input type="password" id="password" name="password" class="auth__input"${ssrRenderAttr("value", unref(formStore).password)} data-v-9e8d456f><span class="${ssrRenderClass(["auth__input-label", { decreased: unref(formStore).password.length }])}" data-v-9e8d456f>Password</span>`);
          if (unref(formStore).passwordErrorMsg.length) {
            _push(`<span class="text-red-500 absolute top-full left-0" data-v-9e8d456f>${ssrInterpolate(unref(formStore).passwordErrorMsg)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
          _push(ssrRenderComponent(_component_PrimaryBtn, {
            tag: "button",
            title: "Create password",
            dark: true,
            class: "large",
            type: "button",
            onClick: signUpProcess
          }, null, _parent));
          _push(`<!--]-->`);
        } else if (unref(formStore).currentForm === "login") {
          _push(`<!--[--><h3 class="auth__title" data-v-9e8d456f>LOGIN TO ADICLUB</h3><span class="auth__text" data-v-9e8d456f> Get free shipping, discount vouchers and members only products when you’re in adiClub. </span><label for="password" class="auth__label" data-v-9e8d456f>Enter your email to access or create your account</label><div class="auth__input-group" data-v-9e8d456f><input type="password" id="password" name="password" class="auth__input"${ssrRenderAttr("value", unref(formStore).password)} data-v-9e8d456f><span class="${ssrRenderClass(["auth__input-label", { decreased: unref(formStore).password.length }])}" data-v-9e8d456f>Password</span>`);
          if (unref(formStore).passwordErrorMsg.length) {
            _push(`<span class="text-red-500 absolute top-full left-0" data-v-9e8d456f>${ssrInterpolate(unref(formStore).passwordErrorMsg)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
          _push(ssrRenderComponent(_component_PrimaryBtn, {
            tag: "button",
            title: "Sign In",
            dark: true,
            type: "button",
            onClick: login
          }, null, _parent));
          _push(`<!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></form></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Auth.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-9e8d456f"]]);
const _sfc_main$4 = {
  __name: "Logout",
  __ssrInlineRender: true,
  setup(__props) {
    const User = useUserStore();
    const Form = useFormStore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PrimaryBtn = __nuxt_component_2$1;
      if (unref(Form).isLogoutOpened) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "overlay" }, _attrs))} data-v-05c87fc2><div class="logout" data-v-05c87fc2><button class="logout__close-btn" data-v-05c87fc2><img${ssrRenderAttr("src", _imports_0$3)} alt="Close" data-v-05c87fc2></button><h3 class="uppercase font-bold text-[25px]" data-v-05c87fc2>Are you sure you want logout?</h3><div class="flex items-center gap-[15px] justify-between" data-v-05c87fc2><button class="logout__cancel-btn" data-v-05c87fc2>Cancel</button>`);
        _push(ssrRenderComponent(_component_PrimaryBtn, {
          dark: true,
          tag: "button",
          title: "Log me out",
          onClick: unref(User).logout
        }, null, _parent));
        _push(`</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Logout.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-05c87fc2"]]);
const _sfc_main$3 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<footer${ssrRenderAttrs(mergeProps({ class: "footer" }, _attrs))} data-v-4d9c01e2><p class="footer__text" data-v-4d9c01e2> ©2023 adidas America, Inc. </p></footer>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/FooterVue.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-4d9c01e2"]]);
const useGalleryStore = defineStore("gallery", {
  state: () => {
    return {
      isOpened: false
    };
  },
  actions: {
    toggleGallery() {
      this.isOpened = !this.isOpened;
    }
  }
});
const _sfc_main$2 = {
  __name: "app",
  __ssrInlineRender: true,
  setup(__props) {
    const navStore = useNavStore();
    const productsStore = useProductsStore();
    const userStore = useUserStore();
    const gallery = useGalleryStore();
    const formStore = useFormStore();
    productsStore.getProducts();
    useHead({
      link: [
        { rel: "icon", href: "/images/adidas-favicon.ico" }
      ],
      script: [
        {
          src: "https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js",
          tagPosition: "bodyClose",
          type: "module"
        },
        {
          src: "https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js",
          tagPosition: "bodyClose"
        }
      ]
    });
    if (userStore.isAuthenticated) {
      userStore.initUser();
    } else {
      setTimeout(() => {
        formStore.isFormOpened = true;
      }, 5e3);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Body = Body;
      const _component_HeaderVue = __nuxt_component_1;
      const _component_NuxtPage = __nuxt_component_2$2;
      const _component_Auth = __nuxt_component_3;
      const _component_Logout = __nuxt_component_4;
      _push(ssrRenderComponent(_component_Body, mergeProps({
        class: [unref(navStore).isNavOpened || unref(gallery).isOpened ? "overflow-hidden" : "", "font-adihaus", "md:overflow-visible"]
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_HeaderVue, null, null, _parent2, _scopeId));
            _push2(`<main class="main"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NuxtPage, null, null, _parent2, _scopeId));
            _push2(`</main>`);
            _push2(ssrRenderComponent(__nuxt_component_2, null, null, _parent2, _scopeId));
            if (!unref(userStore).isAuthenticated) {
              _push2(ssrRenderComponent(_component_Auth, null, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_component_Logout, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_HeaderVue),
              createVNode("main", { class: "main" }, [
                createVNode(_component_NuxtPage)
              ]),
              createVNode(__nuxt_component_2),
              !unref(userStore).isAuthenticated ? (openBlock(), createBlock(_component_Auth, { key: 0 })) : createCommentVNode("", true),
              createVNode(_component_Logout)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const AppComponent = _sfc_main$2;
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_Body = Body;
  const _component_HeaderVue = __nuxt_component_1;
  const _component_FooterVue = __nuxt_component_2;
  _push(ssrRenderComponent(_component_Body, _attrs, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_HeaderVue, null, null, _parent2, _scopeId));
        _push2(`<main class="main flex h-full"${_scopeId}><div class="wrapper flex items-center"${_scopeId}><h1 class="text-center uppercase text-[24px] font-bold font-adineue"${_scopeId}>Page not found</h1></div></main>`);
        _push2(ssrRenderComponent(_component_FooterVue, null, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_HeaderVue),
          createVNode("main", { class: "main flex h-full" }, [
            createVNode("div", { class: "wrapper flex items-center" }, [
              createVNode("h1", { class: "text-center uppercase text-[24px] font-bold font-adineue" }, "Page not found")
            ])
          ]),
          createVNode(_component_FooterVue)
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("error.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const ErrorComponent = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const IslandRenderer = /* @__PURE__ */ defineAsyncComponent(() => import('./_nuxt/island-renderer-84d0a7fd.mjs').then((r) => r.default || r));
    const nuxtApp = useNuxtApp();
    nuxtApp.deferHydration();
    nuxtApp.ssrContext.url;
    const SingleRenderer = false;
    provide(PageRouteSymbol, useRoute());
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup");
    const error = useError();
    onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        const p = nuxtApp.runWithContext(() => showError(err));
        onServerPrefetch(() => p);
        return false;
      }
    });
    const { islandContext } = nuxtApp.ssrContext;
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderSuspense(_push, {
        default: () => {
          if (unref(error)) {
            _push(ssrRenderComponent(unref(ErrorComponent), { error: unref(error) }, null, _parent));
          } else if (unref(islandContext)) {
            _push(ssrRenderComponent(unref(IslandRenderer), { context: unref(islandContext) }, null, _parent));
          } else if (unref(SingleRenderer)) {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(SingleRenderer)), null, null), _parent);
          } else {
            _push(ssrRenderComponent(unref(AppComponent), null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const RootComponent = _sfc_main;
if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch$1.create({
    baseURL: baseURL()
  });
}
let entry;
{
  entry = async function createNuxtAppServer(ssrContext) {
    const vueApp = createApp(RootComponent);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (err) {
      await nuxt.hooks.callHook("app:error", err);
      nuxt.payload.error = nuxt.payload.error || err;
    }
    if (ssrContext == null ? void 0 : ssrContext._renderResponse) {
      throw new Error("skipping render");
    }
    return vueApp;
  };
}
const entry$1 = (ctx) => entry(ctx);

export { Body as B, Html as H, _export_sfc as _, _imports_0$3 as a, __nuxt_component_1$2 as b, createError as c, __nuxt_component_2$1 as d, entry$1 as default, useProductsStore as e, useNavStore as f, useRoute as g, _imports_0 as h, useAsyncData as i, useGalleryStore as j, useFormStore as k, useHead as l, _imports_0$2 as m, _imports_1 as n, useState as o, useCookie as p, defineNuxtRouteMiddleware as q, navigateTo as r, useRequestEvent as s, setResponseStatus as t, useUserStore as u };
//# sourceMappingURL=server.mjs.map
