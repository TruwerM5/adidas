import { defineEventHandler, readBody } from 'h3';
import { U as User } from './user.mjs';
import 'mongoose';

const users_post = defineEventHandler(async (evt) => {
  const email = await readBody(evt);
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return { exists: true };
    } else {
      return { exists: false };
    }
  } catch (e) {
    console.log("Error", e.message);
  }
});

export { users_post as default };
//# sourceMappingURL=users.post.mjs.map
