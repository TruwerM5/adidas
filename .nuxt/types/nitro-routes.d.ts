// Generated by nitro
import type { Serialize, Simplify } from 'nitropack'
declare module 'nitropack' {
  type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T
  interface InternalApi {
    '/api/cart': {
      'get': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/cart.get').default>>>>
      'post': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/cart.post').default>>>>
    }
    '/api/list/:code': {
      'get': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/list/[code].get').default>>>>
    }
    '/api/login': {
      'post': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/login.post').default>>>>
    }
    '/api/products': {
      'get': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/products.get').default>>>>
    }
    '/api/products/:code': {
      'get': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/products/[code].get').default>>>>
    }
    '/api/products/codeMany': {
      'get': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/products/codeMany.get').default>>>>
    }
    '/api/products/gender/:gender': {
      'get': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/products/gender/[gender].get').default>>>>
    }
    '/api/products/setQuantity': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/products/setQuantity').default>>>>
    }
    '/api/signup': {
      'post': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/signup.post').default>>>>
    }
    '/api/user': {
      'get': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/user.get').default>>>>
    }
    '/api/users': {
      'post': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/users.post').default>>>>
    }
    '/api/watched': {
      'post': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/watched.post').default>>>>
    }
    '/api/wishlist': {
      'post': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/wishlist.post').default>>>>
    }
    '/__nuxt_error': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../node_modules/nuxt/dist/core/runtime/nitro/renderer').default>>>>
    }
  }
}
export {}