import { prismaClient } from "../src/application/database.js";
import bcrypt from "bcrypt"

export const removeTestUser = async()=>{
    await prismaClient.user.deleteMany({
        where : {
            email : "test@test.com"
        }
    })
}

export const removeTestSiswa = async()=>{
    await prismaClient.siswa.deleteMany({
        where : {
            nama : "test"
        }
    })
}

export const removeTestGuru = async()=>{
    const lastGuru = await prismaClient.guru.findFirst({
        orderBy :{
            id : "desc"
        }
    })

    if(lastGuru){
        await prismaClient.guru.delete({
            where : {
                id : lastGuru.id
            }
        })
    }
}

// export const createTestKelas = async()=> {
//     await prismaClient.kelas.create({
//         data :{
//             nama_kelas : 'test'
//         }
//     })
// }

// export const getTestKelas = async()=>{
//     await prisma
// }

export const getTestSiswa = async()=>{
    return prismaClient.siswa.count()
}

export const getTestGuru = async()=>{
    return prismaClient.guru.count()
}

export const createTestUser = async()=>{
    const registerUser = await prismaClient.user.create({
        data:{
            email : "test@test.com",
            password : await bcrypt.hash("test" , 10),
            nama : "test",
            role : "guru",
            token : "test"
        },
        select : {
            email : true,
            nama : true,
            role : true,
            id : true
        }
    })

    if(registerUser.role === "guru"){
        await prismaClient.guru.create({
            data :{
                userId : registerUser.id,
            }
        });
    }else if(registerUser.role === "siswa"){
        await prismaClient.siswa.create({
            data:{
                userId : registerUser.id,
                nama : registerUser.nama,
                kelasId : 1 //ini ganti cok nanti pikirin cara nya gimana
            }
        });
    }
}

export const getTestUser = async()=>{
    return prismaClient.user.findUnique({
        where : {
            email : "test@test.com"
        }
    })
}

export const removeTestMapel = async()=>{
    await prismaClient.mapel.deleteMany({
        where : {
            nama : "test"
        }
    })
}

export const createTestMapel = async()=>{
    await prismaClient.mapel.create({
        data :{
           nama : "test",
            guru_id : 68
        }
    })
}

export const getTestMapel = async()=>{
    return prismaClient.mapel.findFirst({
        where : {
            nama : "test"
        }
    })
}
