import { validate } from "../validation/validate.js";
import { getUserValidation, loginUserValidation, refreshTokenValidation, registerUserValidation, updateUserValidation } from "../validation/user-validation.js";
import bcrypt from 'bcrypt';
import { prismaClient } from "../application/database.js";
import { responseError } from "../error/response-error.js";
import {v4 as uuid} from 'uuid'
import jwt from "jsonwebtoken"

const register = async(request)=>{
    const user = validate(registerUserValidation , request);

    const countUser = await prismaClient.user.count({
        where : {
            email : user.email
        }
    })

    if(countUser === 1){
        throw new responseError(401 , "email sudah terdaftar");
    }

    user.password = await bcrypt.hash(user.password , 10);

    const registerUser = await prismaClient.user.create({
        data:{
            email : user.email,
            password : user.password,
            nama : user.nama,
            role : user.role 
        },
        select : {
            email : true,
            nama : true,
            role : true,
            id : true
        }
    })

    if(user.role === "guru"){
        await prismaClient.guru.create({
            data :{
                userId : registerUser.id,
            }
        });
    }else if(user.role === "siswa"){
        const kelas = await prismaClient.kelas.findUnique({
            where : {
                nama_kelas : user.kelas
            }
        })

        await prismaClient.siswa.create({
            data:{
                userId : registerUser.id,
                nama : registerUser.nama,
                kelasId : kelas.id
            }
        });
    }

    return registerUser;

}

const login = async(request)=> {
    const loginRequest = validate(loginUserValidation , request);

    const user = await prismaClient.user.findUnique({
        where : {
            email : loginRequest.email
        },select : {
            email : true , 
            password : true,
            id : true
        }
    });


    if(!user){
        throw new responseError(401 , "Email or Password wrong!");
    }

    const isPasswordValid = await bcrypt.compare(loginRequest.password , user.password);
    if(!isPasswordValid){
        throw new responseError(401,"Email Or Password wrong!");
    }

    const tokenAccess = jwt.sign({
        id : user.id,
        email : user.email
    }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn : "30s"
    });

    const tokenRefresh = jwt.sign({
         id : user.id,
        email : user.email
    }, process.env.REFRESH_TOKEN_SECRET);

    const token = {
        accessToken : tokenAccess,
        refreshToken : tokenRefresh
    }

    const updateToken = await prismaClient.user.update({
        where : {
           id : user.id
        },data : {
            token : tokenRefresh
        },select : {
            token : true
        }
    });

    if (!updateToken.token) throw new responseError(500, "Token update failed");
    return token;
    
} 

const get = async(email) => {
    const emailRequest = validate(getUserValidation , email);

    const user = await prismaClient.user.findUnique({
        where : {
            email : emailRequest
        },select : {
            email : true,
            nama : true,
            role : true
        }
    });
    
    if(!user){
        throw new responseError(404 , "user not found!");
    }
    return user
}

const update = async(request)=>{
    const user = validate(updateUserValidation , request);
    const data = {};

    const totalUserInDB = await prismaClient.user.count({
        where : {
            email : user.email
        }
    });

    if(totalUserInDB !== 1){
        throw new responseError(404 , "User Not Found!");
    }

    if(user.nama){
        data.nama = user.nama;
    }
   
     if(user.password){
        data.password = await bcrypt.hash(user.password , 10);
    }
    if(user.emailChange){
        data.email = user.emailChange
    }
    console.log(user)

    return prismaClient.user.update({
        where : {
            email : user.email
        },data : data,
        select : {
            email : true,
            nama : true
        }
    })
}

const logout = async(email)=>{
    email = validate(getUserValidation , email);

    const user = await prismaClient.user.findUnique({
        where : {
            email : email
        }
    });

    if(!user){
        throw new responseError(404 , "User Not Found!");
    }

    await prismaClient.user.update({
        where : {
            email : email
        },data : {
            token : null
        }
    })
}

const refreshToken = async(tokenRefresh) => {
    tokenRefresh = validate(refreshTokenValidation , tokenRefresh);
    const user = await prismaClient.user.findUnique({
        where : {
            token : tokenRefresh
        },
        select : {
            email : true,
            id  : true
        }
    });

    if(!user) throw new responseError(404 , "Token Not Found!");

    const accessToken = jwt.sign(user , process.env.ACCESS_TOKEN_SECRET);
    return accessToken;
}

export default{
    register,login,get,update,logout,refreshToken
}