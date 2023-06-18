import mongoose from "mongoose";

export const connectDB = ()=> {
    mongoose.connect(process.env.MONGO_URI, { dbName:"backendapi"}).then(() => console.log("Shree Hare Radhe ,Database Connected")).catch((e)=> console.log("not connected Shree Hare Radhe"));
};
