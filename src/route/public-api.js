import express from "express"
import userController from "../controller/user-controller.js";
import mapelController from "../controller/mapel-controller.js";
import kelasController from "../controller/kelas-controller.js";
import jwt from "jsonwebtoken"

const publicRouter = express.Router();

publicRouter.post('/api/users' , userController.register);
publicRouter.post('/api/users/login' , userController.login);
publicRouter.get('/api/users/token' , userController.token)

publicRouter.get('/api/mapel' , mapelController.search);

publicRouter.get('/api/kelas' , kelasController.get);

publicRouter.get('/token' , async(req,res)=> {
  const accessToken = jwt.sign("testing" , process.env.ACCESS_TOKEN_SECRET);
  const refreshToken = jwt.sign("testing" , process.env.REFRESH_TOKEN_SECRET)
  res.status(200).json({
    jwt : accessToken,
    refresh_token : refreshToken
  })
})

export{
    publicRouter
}