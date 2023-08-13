import User from "../models/user";
import bcrypt from 'bcrypt';

export default defineEventHandler(async (evt) => {
    try {
        const { email, password } = await readBody(evt);
        const user = await User.findOne({ email });
        const hash = await bcrypt.compare(password, user.password);
        const token = user.token;
        
        if(hash) {
            setCookie(evt, 'token', token, { maxAge: 7200 });
            return { user };
        } else {
            return { err: 'Invalid data' }
        }
    } catch(e) {
        console.log(e.message);
    }
    
})