import { defineEventHandler, readBody, setCookie } from 'h3';
import { U as User } from './user.mjs';
import bcrypt from 'bcrypt';
import 'mongoose';

const login_post = defineEventHandler(async (evt) => {
  try {
    const { email, password } = await readBody(evt);
    const user = await User.findOne({ email });
    const hash = await bcrypt.compare(password, user.password);
    const token = user.token;
    if (hash) {
      setCookie(evt, "token", token, { maxAge: 7200 });
      return { user };
    } else {
      return { err: "Invalid data" };
    }
  } catch (e) {
    console.log(e.message);
  }
});

export { login_post as default };
//# sourceMappingURL=login.post.mjs.map
