import supertest from "supertest";
import { web } from "../src/application/web.js";

describe('POST /api/kelas' , ()=>{
    it('should can create kelas' , async()=>{
        const result = await supertest(web).post('/api/kelas').set("Authorization" , "27d8b5eb-1325-43f4-9f94-0a8f11fa8850").send({
            nama_kelas : "9.2"
        });

        console.log(result.body)

        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
    })
})

describe('DELETE /api/kelas' , ()=>{
    it('should can DELETE kelas' , async()=>{
        const result = await supertest(web).delete('/api/kelas').set("Authorization" , "27d8b5eb-1325-43f4-9f94-0a8f11fa8850").send({
            nama_kelas : "Kelas 9.2"
        });

        console.log(result.body)

        expect(result.status).toBe(200);
        expect(result.body.data).toBe("OK");
    })
})

describe('GET /api/kelas' , ()=>{
    it('should can get kelas' , async()=>{
        const result = await supertest(web).get('/api/kelas?nama=9.2').set("Authorization" , "27d8b5eb-1325-43f4-9f94-0a8f11fa8850");

        console.log(result.body)

        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
    })
})