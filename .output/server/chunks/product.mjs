import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
  name: String,
  short_name: String,
  price: Number,
  discount: Number,
  gallery: [String],
  category: String,
  prod_collection: String,
  description: {
    subtitle: String,
    text: String
  },
  details: [String],
  reviews: Number,
  model: String,
  color: String,
  code: String
});
const product = mongoose.model("products", productSchema);
const product$1 = product;

export { product$1 as p };
//# sourceMappingURL=product.mjs.map
