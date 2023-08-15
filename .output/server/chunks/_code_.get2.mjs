import { defineEventHandler } from 'h3';
import { p as product } from './product.mjs';
import 'mongoose';

const _code__get = defineEventHandler(async (evt) => {
  return await product.findOne({ code: evt.context.params.code });
});

export { _code__get as default };
//# sourceMappingURL=_code_.get2.mjs.map
