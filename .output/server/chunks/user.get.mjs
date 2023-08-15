import { defineEventHandler } from 'h3';
import { U as User } from './user.mjs';
import { C as Cart } from './cart.mjs';
import 'mongoose';

const user_get = defineEventHandler(async (evt) => {
  const token = evt.node.req.headers.authorization;
  const user = await User.findOne({ token });
  const cart = await Cart.findOne({ token });
  const context = {
    email: user.email,
    orders: user.orders,
    wishlist: user.wishlist,
    token: user.token,
    watchedList: user.watchedList,
    cart
  };
  return { user: context };
});

export { user_get as default };
//# sourceMappingURL=user.get.mjs.map
