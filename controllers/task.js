import Task from "../models/task.js"

// ------------------------------ To create new Task -----------------------------------------------------//


export const newTask = async (req,res,next) => {
     
    const { title , description } = req.body;

    await Task.create({                  // "create" is use to data in backend---//
        title,
        description,
        user:req.user,
    });

    res.status(201).json({
        success:true,
        message:"Task added Successfulley"
    })
}


// ------------------------------To get Task data-------------------------------------------------------------//


export const getMyTask = async ( req , res , next ) => {
    const userid = req.user._id;


    const tasks = await Task.find({user : userid });  // jis user ne sare task mange hai hum uske sare task ke array denge to database me //
    // same user ke id dhundenge//

    res.status(200).json({
        success:true,
        tasks,           // Task ke array pass krne hai hume user ko--//
    })
}


// ---------------------------Update checkBox or Delete task from backend---------------------------------------//


export const updateTask = async ( req , res , next ) => {
    
     const { id } = req.params;

    //  const task = await Task.findById(id);// or we can also use to get id below 
   
        const task = await Task.findById(req.params.id);

        if(!task)
      return res.status(404).json({
        success: false,
        message: "Invalid Id",
      });

        task.isCompleted = !task.isCompleted;

        task.save;
      
    res.status(200).json({
        success:true,
        message:"Task Updated"
    })
}


export const deleteTask = async ( req , res , next ) => {
  
    const task = await Task.findById(req.params.id);
    
    if(!task)
      return res.status(404).json({
        success: false,
        message: "Invalid Id",
      });

    await task.deleteOne();   // TO delete Task

    task.save;

    res.status(200).json({
        success:true,
        message:"Task deleted"
    })
}