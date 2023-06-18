import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";

export const getAllUsers = async (req , res) => {
   
    
}







// ------------------------------------------------------------------------------------------------------------------//




export const register = async (req,res)=>{                     //Create New Account (register new account)

   const {name , email , password} = req.body;

   let user = await User.findOne({ email })

   if(user)
     return res.status(404).json({
        success:false,
        message:"User Already exist",
     });

     const hashedPassword = await bcrypt.hash(password, 10)

     user = User.create({name,email,password : hashedPassword})
     
     sendCookie(user,res,"Registered Successfulley",201)    // created a new function for creating a cooking in ../utils/features.js
 }









// -------------------------------------------------------------------------------------------------------------------//


 export const login = async(req,res,next)=> {
  
    const { email , password }  = req.body;

    const user = await User.findOne({ email }).select("+password");    //jub hum user.passward krenge to hume passward nhe milega 
// kyoke humne ..models/user.js me password me select false kr rakha hai ho hume esa manually select krna padega uske baad mil jayega

    if(!user)   //jub Email match nhe krega
     return res.status(404).json({
        success:false,
        message:" Invalid Email or Passward "
     })

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch)  //jub Passward match nhe krega
       return res.status(404).json({
       success:false,
       message:" Invalid Email or Passward "
    })

    sendCookie(user,res, `Welcome back, ${user.name}`, 200);

}













//  -----------------------------------------------------------------------------------------------------------------//

 export const getMyProfile = async (req,res) => {

  res.status(200).json({
    success:true,
    user:req.user,
  });

}

// -----------------------------------------------------------------------------------------------------------------//
// logout me hume cookie ko khatam krna hota hai


// Two ways to delete Cookies

// 1
// export const logout = ( req , res ) =>{

//   res.status(200).cookie("token","",{ expires: new Date(Date.now()) } ).json({
//       success:true,
//       user: req.user,
//     });
  
// }

// 2
export const logout = ( req , res ) =>{

  res.status(200).clearCookie("token").json({
      success:true,
      user: req.user,
    });
  
}