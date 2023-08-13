import User from "../models/user";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const config = useRuntimeConfig();

export default defineEventHandler( async (evt) => {
    try {
        const { email, password } = await readBody(evt);
        const hash = await bcrypt.hash(password, 10);

        
        const token = jwt.sign(
            { email },
            config.tokenSecret,
            {expiresIn: "2h"}
        );

        const user = await User.create({ email, password: hash, token });
        setCookie(evt, 'token', token, { maxAge: 7200 });
        return { user };
    } catch(e) {
        console.log(e.message);
    }
    
})