import mongoose from 'mongoose';
const config = useRuntimeConfig();

export default defineEventHandler(async () => {
    try {
        await mongoose.connect(config.mongodbUri);
        console.log('MongoDB connection established...')

    } catch (error) {
        console.log(error.message)
    }

});