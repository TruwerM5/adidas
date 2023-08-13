import product from "../models/product";

export default defineEventHandler(async () => {
    const products = await product.find();
    return products;
})