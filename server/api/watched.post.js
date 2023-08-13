import User from "../models/user";

export default defineEventHandler(async (evt) => {
    const body = await readBody(evt);
    await User.updateOne({token: body.token}, {$push: { watchedList: body.product }});
    return true;
});