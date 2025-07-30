import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DATABASE CONNECTION SUCCESSFUL!");
    } catch (error) {
        console.log("DATABASE CONNECTION FAILED!");
        console.log(error)
        process.exit(1); // EXIT WITH FAILURE
    }
}
   