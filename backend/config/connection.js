import mongoose from 'mongoose'

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING)
        console.log('MongoDB Connected!')
    }
    catch (err) {
        console.log(err)
    }
}
connectDB()