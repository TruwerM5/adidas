import { defineEventHandler, getRequestHeaders } from 'h3';
import { p as product } from './product.mjs';
import 'mongoose';

const codeMany_get = defineEventHandler(async (evt) => {
  let codes = getRequestHeaders(evt).codes;
  codes = codes.split(", ");
  const response = await product.find({ code: { $in: codes } });
  return response;
});

export { codeMany_get as default };
//# sourceMappingURL=codeMany.get.mjs.map
