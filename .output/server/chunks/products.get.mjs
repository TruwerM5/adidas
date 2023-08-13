import { defineEventHandler } from 'h3';
import { p as product } from './product.mjs';
import 'mongoose';

const products_get = defineEventHandler(async () => {
  const products = await product.find();
  return products;
});

export { products_get as default };
//# sourceMappingURL=products.get.mjs.map
