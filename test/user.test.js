import supertest from "supertest";
import { web } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";
import bcrypt from "bcrypt"
import { createTestUser, getTestGuru, getTestSiswa, removeTestGuru, removeTestSiswa, removeTestUser } from "./test-util.js";

describe('POST /api/users' , ()=>{
    afterEach(async()=>{
        await removeTestSiswa();
        await removeTestGuru();
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
        expect(getSiswa).toBe(2)
    })

    it('should have register user guru' , async()=>{
        const result = await supertest(web).post('/api/users').send({
            email : "test@test.com",
            password : "test",
            nama : "test",
            role : "guru"
        });


        expect(result.status).toBe(200);
        expect(result.body.data.email).toBe("test@test.com");
        expect(result.body.data.nama).toBe("test");
        expect(result.body.data.role).toBe("guru");
        
        const getGuru = await getTestGuru();
        expect(getGuru).toBe(1);
    })
})

describe('POST /api/users/login' , ()=>{
     afterEach(async()=>{
        await removeTestSiswa();
        await removeTestGuru();
        await removeTestUser();
       
    });
    beforeEach(async()=>{
        await createTestUser();
    })

    it('should do login' , async()=>{
        const result = await supertest(web).post('/api/users/login').send({
          email : "test@test.com",
          password : "test"  
        });

        console.info(result.error);
        expect(result.status).toBe(200);
        expect(result.body.data.token).toBeDefined();
        expect(result.body.data.token).not.toBe("test");
    })

    it('should reject login if password wrong' , async()=>{
        const result = await supertest(web).post('/api/users/login').send({
          email : "test@test.com",
          password : "tes"  
        });

        console.info(result.error);
        expect(result.status).toBe(401);
    })

    it('should reject login if email wrong' , async()=>{
        const result = await supertest(web).post('/api/users/login').send({
          email : "te",
          password : "test"  
        });

        console.info(result.body);
        expect(result.status).toBe(401);
    })
})