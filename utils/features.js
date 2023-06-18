import jwt from "jsonwebtoken"

export const sendCookie = (user,res,message,statuscode) =>{

    const token = jwt.sign({ _id : user._id },process.env.JWT_SECRET)                                     //created token for cookie


    res.status(statuscode).cookie("token",token,{
       httpOnly:true,
       maxAge: 15 * 60 * 1000,                 //15 min
    }).json({
       success:true,
       message,
    })


}