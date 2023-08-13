import product from "~~/server/models/product";

export default defineEventHandler(async (evt) => {
    let codes = getRequestHeaders(evt).codes;
    codes = codes.split(', ');
    const response = await product.find({code: {$in: codes}});
    return response;
})