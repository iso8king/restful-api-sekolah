import express from "express"
import userController from "../controller/user-controller.js";
import { authMiddleware, authRole } from "../middleware/auth-middleware.js";
import mapelController from "../controller/mapel-controller.js";

const userRouter = express.Router();
userRouter.use(authMiddleware); 

//user API
userRouter.get('/api/users/current' , userController.get);
userRouter.patch('/api/users/current' , userController.update);
userRouter.delete('/api/users/logout' , userController.logout)

//mapelAPI
userRouter.post('/api/mapel' , authRole,mapelController.create);
userRouter.get('/api/mapel/:mapelId' , mapelController.get);
userRouter.patch('/api/mapel/:mapelId' , authRole,mapelController.update);
userRouter.delete('/api/mapel/:mapelId' , authRole,mapelController.remove);


export{
    userRouter
}