import User from "../models/user";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    if(body.action === 'push') {
        await User.updateOne({ token: body.token }, { $push: { wishlist: body.product } });
        return { message: 'pushed' };
    } else if(body.action === 'pull') {
        await User.updateOne({token: body.token} ,{ $pull: { wishlist: body.product }});
        return { message: 'pulled' };
    }
});