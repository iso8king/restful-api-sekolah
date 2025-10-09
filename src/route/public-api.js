import express from "express"
import userController from "../controller/user-controller.js";
import mapelController from "../controller/mapel-controller.js";
import kelasController from "../controller/kelas-controller.js";

const publicRouter = express.Router();
publicRouter.post('/api/users' , userController.register);
publicRouter.post('/api/users/login' , userController.login);


publicRouter.get('/api/mapel' , mapelController.search);

publicRouter.get('/api/kelas' , kelasController.get);

export{
    publicRouter
}