import product from "../../models/product";

export default defineEventHandler(async (evt) => {

    return await product.findOne({ code: evt.context.params.code });
});