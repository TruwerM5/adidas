import { defineEventHandler } from 'h3';
import { p as product } from './product.mjs';
import 'mongoose';

const _code__get = defineEventHandler(async (evt) => {
  const params = evt.context.params.code.split(",");
  return await product.find({ code: { $in: params } });
});

export { _code__get as default };
//# sourceMappingURL=_code_.get.mjs.map
