import User from "../models/user";
import Cart from "../models/cart";
import product from "../models/product";

export default defineEventHandler(async (evt) => {
    const body = await readBody(evt);
    const action = body.action;

    
    const cart = await Cart.findOne({
        token: body.token, 
        'products.productCode': body.productCode, 
        'products.size': body.size});
    const Product = await product.findOne({ code: body.productCode}, `
    name color gallery price code discount`);

    const oldProduct = await Cart.findOne({
        token: body.token, 
        'products.productCode': body.productCode, 
        'products.size': body.size });

    if(action === 'insert') {
        if(oldProduct && oldProduct.products.length) {
            await Cart.updateOne(
                {token: body.token, "products.productCode": body.productCode, "products.size": body.size}, 
                {$inc: {"products.$.quantity": 1}}
            )                
        } else {
            await Cart.findOneAndUpdate({token: body.token}, {$push: {
                products: {
                    productCode: body.productCode,
                    size: body.size,
                    quantity: 1,
                    name: Product.name,
                    color: Product.color,
                    price: Product.price,
                    discount: Product.discount,
                    img: Product.gallery[0],
                    
                }
            }}, {upsert: true});
        }
    } else if(action === 'remove') {
        try {
            await Cart.updateOne({
                token: body.token,
                'products.productCode': body.productCode,
                'products.size': body.size,
            }, { $pull: {products: {productCode: body.productCode, size: body.size}}});
        } catch(e) {
            console.log(e.message);
        }
        
    }
    

    
    return true;
})