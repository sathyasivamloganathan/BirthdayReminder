import mongoose from "mongoose";

export const connectDatabase = async() => {
    try {
        const url = process.env.MONGO_URL;
        await mongoose.connect(url);
        console.log("Database Connected")
    } catch (error) {
        console.log("Database Connection: ", error)
    }
}