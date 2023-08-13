import User from "../models/user";

import Cart from "../models/cart";
export default defineEventHandler(async (evt) => {
    
    const token = evt.node.req.headers.authorization

    const user = await User.findOne({ token });
    const cart = await Cart.findOne({token});
    const context = {
        email: user.email,
        orders: user.orders,
        wishlist: user.wishlist,
        token: user.token,
        watchedList: user.watchedList,
        cart,
    }
    return { user: context };
});