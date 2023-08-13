import product from "~~/server/models/product";

export default defineEventHandler(async evt => {
    const params = evt.context.params.code.split(',');
    return await product.find({ code: {$in: params }});
})