import mongoose from "mongoose";

export const connectDB = ()=> {
    mongoose.connect(process.env.MONGO_URI, { dbName:"backendapi"}).then((c) => console.log(`Shree Hare Radhe ,Database Connected with ${c.connection.host}`)).catch((e)=> console.log("not connected Shree Hare Radhe"));
};
