import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    password: String,
    token: String,
    wishlist: {
        type: Array,
        default: []
    },
    orders: {
        type: Array,
        default: [],
    },
    watchedList: {
        type: Array,
        default: [],
    },
    cart: {
        type: Array,
        default: [],
        ref: 'Cart'
    }
    
});

const User = mongoose.model('users', userSchema);

export default User;