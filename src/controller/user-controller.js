import userService from "../service/user-service.js";

const register = async(req,res,next)=>{
    try {
        const result = await userService.register(req.body);
        res.status(200).json({
            data : result
        })
        
    } catch (e) {
        next(e);
    }
}

const login = async(req,res,next)=>{
    try {
        const result = await userService.login(req.body);
        res.cookie("token" , result.accessToken , {
            httpOnly : true,
            maxAge:  30 * 1000
        });

        res.cookie("token_refresh" , result.refreshToken , {
            httpOnly : true
        });

        res.status(200).json({
            data : "OK"
        })
        
    } catch (e) {
        next(e);
    }
}

const get = async(req,res,next)=>{
    try {
        const email = req.user.email;

        const result = await userService.get(email);
        res.status(200).json({
            data : result
        });
        
    } catch (e) {
      next(e)  
    }
}

const update = async(req,res,next)=> {
    try {
        const request = req.body;
        const email = req.user.email;

        if(!request.email){
            request.email = email;
        }

        const result = await userService.update(request);
        res.status(200).json({
            data : result
        })
        
    } catch (e) {
       next(e) 
    }
}

const logout = async(req,res,next)=>{
    try {
        const email = req.user.email;
        const result = await userService.logout(email);
        res.clearCookie("token");
        res.clearCookie("token_refresh");
        
        res.status(200).json({
            data : "OK"
        });
       
        
    } catch (e) {
       next(e) 
    }
}

const token = async(req,res,next)=>{
    try {
        const token = req.cookies.token_refresh;
        const result = await userService.refreshToken(token);
        res.cookie("token" , result);
        res.status(200).json({
            data : "Success"
        })
        
    } catch (e) {
        next(e);  
    }
}

export default{
    register,login,get,update,logout,token
}