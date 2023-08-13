import { defineEventHandler, readBody } from 'h3';
import { C as Cart } from './cart.mjs';
import { p as product } from './product.mjs';
import 'mongoose';

const cart_post = defineEventHandler(async (evt) => {
  const body = await readBody(evt);
  const action = body.action;
  await Cart.findOne({
    token: body.token,
    "products.productCode": body.productCode,
    "products.size": body.size
  });
  const Product = await product.findOne({ code: body.productCode }, `
    name color gallery price code discount`);
  const oldProduct = await Cart.findOne({
    token: body.token,
    "products.productCode": body.productCode,
    "products.size": body.size
  });
  if (action === "insert") {
    if (oldProduct && oldProduct.products.length) {
      await Cart.updateOne(
        { token: body.token, "products.productCode": body.productCode, "products.size": body.size },
        { $inc: { "products.$.quantity": 1 } }
      );
    } else {
      await Cart.findOneAndUpdate({ token: body.token }, { $push: {
        products: {
          productCode: body.productCode,
          size: body.size,
          quantity: 1,
          name: Product.name,
          color: Product.color,
          price: Product.price,
          discount: Product.discount,
          img: Product.gallery[0]
        }
      } }, { upsert: true });
    }
  } else if (action === "remove") {
    try {
      await Cart.updateOne({
        token: body.token,
        "products.productCode": body.productCode,
        "products.size": body.size
      }, { $pull: { products: { productCode: body.productCode, size: body.size } } });
    } catch (e) {
      console.log(e.message);
    }
  }
  return true;
});

export { cart_post as default };
//# sourceMappingURL=cart.post.mjs.map
