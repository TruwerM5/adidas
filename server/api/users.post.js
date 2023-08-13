import User from "../models/user";

export default defineEventHandler(async (evt) => {
    const email = await readBody(evt);
    const userExists = await User.findOne({ email });
    if(userExists) {
        return { exists: true };
    } else {
        return { exists: false };
    }
})