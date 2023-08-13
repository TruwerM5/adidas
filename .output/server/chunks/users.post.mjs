import { defineEventHandler, readBody } from 'h3';
import { U as User } from './user.mjs';
import 'mongoose';

const users_post = defineEventHandler(async (evt) => {
  const email = await readBody(evt);
  const userExists = await User.findOne({ email });
  if (userExists) {
    return { exists: true };
  } else {
    return { exists: false };
  }
});

export { users_post as default };
//# sourceMappingURL=users.post.mjs.map
