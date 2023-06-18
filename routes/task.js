import express from "express"
import { deleteTask, getMyTask, newTask, updateTask } from "../controllers/task.js";
import { isAutenticated } from "../middlewares/auth.js";

const router  =  express.Router();

router.post('/new' , isAutenticated , newTask);  // task wahe add kr paye jo login hai is liya isAuthenticated use kiya hai


router.get('/my' , isAutenticated , getMyTask);

router.route("/:id").put( isAutenticated ,updateTask ).delete( isAutenticated , deleteTask );   //using dynamic url


export default router;