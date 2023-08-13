import { defineEventHandler, readBody } from 'h3';
import { U as User } from './user.mjs';
import 'mongoose';

const wishlist_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (body.action === "push") {
    await User.updateOne({ token: body.token }, { $push: { wishlist: body.product } });
    return { message: "pushed" };
  } else if (body.action === "pull") {
    await User.updateOne({ token: body.token }, { $pull: { wishlist: body.product } });
    return { message: "pulled" };
  }
});

export { wishlist_post as default };
//# sourceMappingURL=wishlist.post.mjs.map
