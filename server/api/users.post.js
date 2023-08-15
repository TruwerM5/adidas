import User from "../models/user";

export default defineEventHandler(async (evt) => {
    const email = await readBody(evt);
    try {
        const userExists = await User.findOne({ email });
        if(userExists) {
            return { exists: true };
        } else {
            return { exists: false };
        }
    } catch(e) {
        console.log('Error', e.message);
    }
    
})