import { defineEventHandler, readBody, setCookie } from 'h3';
import { U as User } from './user.mjs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { u as useRuntimeConfig } from './nitro/node-server.mjs';
import 'mongoose';
import 'node-fetch-native/polyfill';
import 'node:http';
import 'node:https';
import 'destr';
import 'ofetch';
import 'unenv/runtime/fetch/index';
import 'hookable';
import 'scule';
import 'klona';
import 'defu';
import 'ohash';
import 'ufo';
import 'unstorage';
import 'radix3';
import 'node:fs';
import 'node:url';
import 'pathe';
import 'http-graceful-shutdown';

const config = useRuntimeConfig();
const signup_post = defineEventHandler(async (evt) => {
  try {
    const { email, password } = await readBody(evt);
    const hash = await bcrypt.hash(password, 10);
    const token = jwt.sign(
      { email },
      config.tokenSecret,
      { expiresIn: "2h" }
    );
    const user = await User.create({ email, password: hash, token });
    setCookie(evt, "token", token, { maxAge: 7200 });
    return { user };
  } catch (e) {
    console.log(e.message);
  }
});

export { signup_post as default };
//# sourceMappingURL=signup.post.mjs.map
