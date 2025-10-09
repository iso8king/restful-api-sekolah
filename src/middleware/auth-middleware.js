import { prismaClient } from "../application/database.js";
import { responseError } from "../error/response-error.js";

export const authMiddleware = async(req,res,next)=>{
    const token = req.get('Authorization');
    if(!token){
        res.status(501).json({
            errors : "Unauthorized"
        }).end();
    }else{
        const user = await prismaClient.user.findFirst({
        where : {
            token : token
        }, include : {
            guru : {
                select : {
                    id : true
                }
            }
        }
         });
        
         if(!user){
            res.status(501).json({
            errors : "Unauthorized"
        }).end();
         }else{
            req.user = user;
            next();
         }
    }

    
}

export const authRole = async(req,res,next)=>{
    try {
        const role = req.user.role;

    if(role === "siswa"){
        throw new responseError(401 , "Unauthorized");
    }
    next()
        
    } catch (e) {
        next(e)
    }
}