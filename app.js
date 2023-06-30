import express from "express";

import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";

import { config } from "dotenv"
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";



export const app = express();

config({
    path:"./data/config.env",
});

//------------------middle ware-------------------------------------------------//

app.use(express.json()); // to send json data 
app.use(cookieParser());

// -----------------------------------------------------------------------------//

// ------------------------------------------------------------------------------------------------//

app.use("/api/v1/users",userRouter);
app.use("/api/v1/task",taskRouter);

// ------------------------------------------------------------------------------------------------//

app.get("/" , (req,res)=>(
    res.send("Shree Hare Radhe")
))





// --------error handler------------------------------
// jun hum kese function me next ko call krenge while passing error to sara program band ho jayega
// or ye wala error handler chelaga

// using error middleware
app.use(errorMiddleware)