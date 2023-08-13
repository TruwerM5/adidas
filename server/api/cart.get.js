import Order from "../models/cart";
import product from "../models/product";
import User from "../models/user";
import Cart from "../models/cart";


export default defineEventHandler(async (evt) => {
    
    const {token} = getRequestHeaders(evt);
    
    const requestToCart = await Cart.findOne({token});
 
    return requestToCart.products;
});