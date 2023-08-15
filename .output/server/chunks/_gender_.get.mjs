import { defineEventHandler } from 'h3';
import { p as product } from './product.mjs';
import 'mongoose';

const _gender__get = defineEventHandler(async (evt) => {
  const gender = evt.context.params.gender;
  return await product.find({ sex: gender });
});

export { _gender__get as default };
//# sourceMappingURL=_gender_.get.mjs.map
