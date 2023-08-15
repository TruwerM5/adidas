import { defineEventHandler, getRequestHeaders } from 'h3';
import { C as Cart } from './cart.mjs';
import 'mongoose';

const cart_get = defineEventHandler(async (evt) => {
  const { token } = getRequestHeaders(evt);
  const requestToCart = await Cart.findOne({ token });
  return requestToCart.products;
});

export { cart_get as default };
//# sourceMappingURL=cart.get.mjs.map
