import { prismaClient } from "../src/application/database.js";

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
