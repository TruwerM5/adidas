import Cart from "~~/server/models/cart";

export default defineEventHandler(async (evt) => {
    const body = await readBody(evt);
    try {
        // const item = 
        await Cart.updateOne({
            token: body.token, 
            'products.productCode': body.code,
            'products.size': body.size}, {
                $set: {'products.$.quantity':  body.quantity,}
               
            });
    } catch(e) {
        console.log(e.message);
    }
    
    return true;
        
})