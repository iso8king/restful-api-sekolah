import { validate } from "../validation/validate.js";
import { loginUserValidation, registerUserValidation } from "../validation/user-validation.js";
import bcrypt from 'bcrypt';
import { prismaClient } from "../application/database.js";
import { responseError } from "../error/response-error.js";
import {v4 as uuid} from 'uuid'

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
        data:user,
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
        await prismaClient.siswa.create({
            data:{
                userId : registerUser.id,
                nama : registerUser.nama,
                kelasId : 1 //ini ganti cok nanti pikirin cara nya gimana
            }
        });
    }

    return registerUser;

}

const login = async(request)=> {
    const loginRequest = validate(loginUserValidation , request);

    const user = await prismaClient.user.findFirst({
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

    const token = uuid().toString();

    return prismaClient.user.update({
        where : {
           id : user.id
        },data : {
            token : token
        },select : {
            token : true
        }
    })
    
} 

export default{
    register,login
}