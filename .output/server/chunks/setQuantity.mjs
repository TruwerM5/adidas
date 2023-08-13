import { defineEventHandler, readBody } from 'h3';
import { C as Cart } from './cart.mjs';
import 'mongoose';

const setQuantity = defineEventHandler(async (evt) => {
  const body = await readBody(evt);
  try {
    await Cart.updateOne({
      token: body.token,
      "products.productCode": body.code,
      "products.size": body.size
    }, {
      $set: { "products.$.quantity": body.quantity }
    });
  } catch (e) {
    console.log(e.message);
  }
  return true;
});

export { setQuantity as default };
//# sourceMappingURL=setQuantity.mjs.map
