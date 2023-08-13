import type { NavigationGuard } from 'vue-router'
export type MiddlewareKey = "auth" | "notfound"
declare module "/home/kali/Documents/projects/Adidas/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  }
}