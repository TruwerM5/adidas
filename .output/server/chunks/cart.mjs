import mongoose from 'mongoose';

const orderSchema = mongoose.Schema({
  token: String,
  products: [{
    productCode: String,
    size: Number,
    quantity: {
      type: Number,
      default: 1
    },
    name: String,
    img: String,
    color: String,
    price: Number,
    discount: Number
  }]
}, { _id: false });
const Cart = mongoose.model("Cart", orderSchema);
const Cart$1 = Cart;

export { Cart$1 as C };
//# sourceMappingURL=cart.mjs.map
