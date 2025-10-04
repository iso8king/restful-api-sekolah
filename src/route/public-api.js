import express from "express"
import userController from "../controller/user-controller.js";
import mapelController from "../controller/mapel-controller.js";

const publicRouter = express.Router();
publicRouter.post('/api/users' , userController.register);
publicRouter.post('/api/users/login' , userController.login);


publicRouter.get('/api/mapel' , mapelController.search);

export{
    publicRouter
}