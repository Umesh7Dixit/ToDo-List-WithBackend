import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) return next(new ErrorHandler("Invalid Email or Password", 400));

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return next(new ErrorHandler("Invalid Email or Password", 400));

    sendCookie(user, res, `Welcome back, ${user.name}`, 200);
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) return next(new ErrorHandler("User Already Exist", 400));

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({ name, email, password: hashedPassword });

    sendCookie(user, res, "Registered Successfully", 201);
  } catch (error) {
    next(error);
  }
};

export const getMyProfile = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Develpoment" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Develpoment" ? false : true,
    })
    .json({
      success: true,
      user: req.user,
    });
};












































// import { User } from "../models/user.js";
// import bcrypt from "bcrypt";
// import { sendCookie } from "../utils/features.js";
// import ErrorHandler from "../middlewares/error.js";

// export const getAllUsers = async (req , res) => {
   
    
// }







// // ------------------------------------------------------------------------------------------------------------------//




// export const register = async (req,res)=>{                     //Create New Account (register new account)

//   try {
   
//    const {name , email , password} = req.body;

//    let user = await User.findOne({ email })

//    // if(user)
//    //   return res.status(404).json({
//    //      success:false,
//    //      message:"User Already exist",
//    //   });

// //  new way to write error 

// if(!user)
//      return next(new ErrorHandler("User Already exist",400));



//      const hashedPassword = await bcrypt.hash(password, 10)

//      user = User.create({name,email,password : hashedPassword})
     
//      sendCookie(user,res,"Registered Successfulley",201)    // created a new function for creating a cooking in ../utils/features.js

//   } catch (error) {
//     next(error)
//   }
//  }









// // -------------------------------------------------------------------------------------------------------------------//


//  export const login = async(req,res,next)=> {
  
//    try {
//       const { email , password }  = req.body;

//       const user = await User.findOne({ email }).select("+password");    //jub hum user.passward krenge to hume passward nhe milega 
//   // kyoke humne ..models/user.js me password me select false kr rakha hai ho hume esa manually select krna padega uske baad mil jayega
  
//   if(!user)
//   return next(new ErrorHandler("Invalid email or passward",400));
  
//      //  if(!user)   //jub Email match nhe krega
//      //   return res.status(404).json({
//         //   success:false,
//         //   message:" Invalid Email or Passward "
//      //   })
  
//       const isMatch = await bcrypt.compare(password, user.password);
   
//      //  if(!isMatch)  //jub Passward match nhe krega
//         //  return res.status(404).json({
//         //  success:false,
//         //  message:" Invalid Email or Passward "
//      //  })
  
//      if(!isMatch)
//   return next(new ErrorHandler("Invalid email or passward",400));
  
//       sendCookie(user,res, `Welcome back, ${user.name}`, 200);
//    } catch (error) {
//       next(error)
//    }

// }













// //  -----------------------------------------------------------------------------------------------------------------//

//  export const getMyProfile =  (req,res) => {

//   res.status(200).json({
//     success:true,
//     user:req.user,
//   });

// }

// // -----------------------------------------------------------------------------------------------------------------//
// // logout me hume cookie ko khatam krna hota hai


// // Two ways to delete Cookies

// // 1
// // export const logout = ( req , res ) =>{

// //   res.status(200).cookie("token","",{ expires: new Date(Date.now()) } ).json({
// //       success:true,
// //       user: req.user,
// //     });
  
// // }

// // 2
// export const logout = ( req , res ) =>{

//   res.status(200).clearCookie("token" , 
//   { sameSite:process.env.NODE_ENV === "Development" ? "lax" : "none",
//     secure:process.env.NODE_ENV === "Development" ? false : true, }
//   ).json({
//       success:true,
//       user: req.user,
//     });
  
// }

