import { defineEventHandler, readBody } from 'h3';
import { U as User } from './user.mjs';
import 'mongoose';

const watched_post = defineEventHandler(async (evt) => {
  const body = await readBody(evt);
  await User.updateOne({ token: body.token }, { $push: { watchedList: body.product } });
  return true;
});

export { watched_post as default };
//# sourceMappingURL=watched.post.mjs.map
