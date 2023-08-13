// Generated by nitro
declare module 'nitropack' {
  type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T
  interface InternalApi {
    '/api/cart': {
      'get': Awaited<ReturnType<typeof import('../../server/api/cart.get').default>>
      'post': Awaited<ReturnType<typeof import('../../server/api/cart.post').default>>
    }
    '/api/list/:code': {
      'get': Awaited<ReturnType<typeof import('../../server/api/list/[code].get').default>>
    }
    '/api/login': {
      'post': Awaited<ReturnType<typeof import('../../server/api/login.post').default>>
    }
    '/api/products': {
      'get': Awaited<ReturnType<typeof import('../../server/api/products.get').default>>
    }
    '/api/products/:code': {
      'get': Awaited<ReturnType<typeof import('../../server/api/products/[code].get').default>>
    }
    '/api/products/codeMany': {
      'get': Awaited<ReturnType<typeof import('../../server/api/products/codeMany.get').default>>
    }
    '/api/products/gender/:gender': {
      'get': Awaited<ReturnType<typeof import('../../server/api/products/gender/[gender].get').default>>
    }
    '/api/products/setQuantity': {
      'default': Awaited<ReturnType<typeof import('../../server/api/products/setQuantity').default>>
    }
    '/api/signup': {
      'post': Awaited<ReturnType<typeof import('../../server/api/signup.post').default>>
    }
    '/api/user': {
      'get': Awaited<ReturnType<typeof import('../../server/api/user.get').default>>
    }
    '/api/users': {
      'post': Awaited<ReturnType<typeof import('../../server/api/users.post').default>>
    }
    '/api/watched': {
      'post': Awaited<ReturnType<typeof import('../../server/api/watched.post').default>>
    }
    '/api/wishlist': {
      'post': Awaited<ReturnType<typeof import('../../server/api/wishlist.post').default>>
    }
    '/__nuxt_error': {
      'default': Awaited<ReturnType<typeof import('../../node_modules/nuxt/dist/core/runtime/nitro/renderer').default>>
    }
  }
}
export {}