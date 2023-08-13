import product from "~~/server/models/product";
export default defineEventHandler(async (evt) => {
    const gender = evt.context.params.gender;
    return await product.find({ sex: gender });
})