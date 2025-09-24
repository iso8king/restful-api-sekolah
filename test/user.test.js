import supertest from "supertest";
import { web } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";
import bcrypt from "bcrypt"
import { getTestSiswa, removeTestSiswa, removeTestUser } from "./test-util.js";

describe('POST /api/users' , ()=>{
    afterEach(async()=>{
        await removeTestSiswa()
        await removeTestUser();
       
    })
    it('should have register user siswa' , async()=>{
        const result = await supertest(web).post('/api/users').send({
            email : "test@test.com",
            password : "test",
            nama : "test",
            role : "siswa"
        });
        console.log(result.error)

        expect(result.status).toBe(200);
        expect(result.body.data.email).toBe("test@test.com");
        expect(result.body.data.nama).toBe("test");
        expect(result.body.data.role).toBe("siswa");
        
        const getSiswa = await getTestSiswa();
        expect(getSiswa).toBe(1)
    })
})