import supertest from "supertest";
import { createTestMapel, createTestUser, getTestMapel, removeTestMapel } from "./test-util.js";
import { web } from "../src/application/web.js";
import { request } from "express";

describe("POST /api/mapel" , ()=>{
    afterEach(async()=>{
        await removeTestMapel;
    });

    it('should create mapel' , async()=>{
        const result = await supertest(web).post("/api/mapel").set("Authorization" , "27d8b5eb-1325-43f4-9f94-0a8f11fa8850").send({
            nama : "test"
        });

        console.log(result.body)

        expect(result.status).toBe(200);
        expect(result.body.data.nama).toBe("test");
        expect(result.body.data.guru).toBeDefined();
    })
});

describe("GET /api/mapel/:mapelId" , ()=>{
    it("should return mapel with params" , async()=> {
        const result = await supertest(web).get("/api/mapel/4").set("Authorization" , "27d8b5eb-1325-43f4-9f94-0a8f11fa8850");

        console.log(result.body)
        expect(result.status).toBe(200);
        expect(result.body.data.id).toBe(4);
        expect(result.body.data.nama).toBe("Algoritma Komputer");
        expect(result.body.data.guru).toBeDefined();
    });

     it("should reject mapel with params null" , async()=> {
        const result = await supertest(web).get("/api/mapel/5").set("Authorization" , "27d8b5eb-1325-43f4-9f94-0a8f11fa8850");

        console.log(result.body)
        expect(result.status).toBe(404);
        
    });
});

describe("POST /api/mapel/:mapelId" , ()=>{
    it('should have update nama mapel' , async()=>{
        const result = await supertest(web).patch("/api/mapel/4").set("Authorization" , "27d8b5eb-1325-43f4-9f94-0a8f11fa8850").send({
            nama : "Algoritma Komputer"
        });

        expect(result.status).toBe(200);
        expect(result.body.data.nama).toBe("Algoritma Komputer");
    })

    it('should have update guru' , async()=>{
        const result = await supertest(web).patch("/api/mapel/4").set("Authorization" , "27d8b5eb-1325-43f4-9f94-0a8f11fa8850").send({
            guru_id : 68
        });

        expect(result.status).toBe(200);
        expect(result.body.data.nama).toBe("Algoritma Komputer");
    })
})

describe('DELETE /api/mapel/:mapelId', ()=>{
    beforeEach(async()=> {
        await createTestMapel()
    });

    it('should delete mapel' , async()=>{
        const testMapel = await getTestMapel();
        console.log(testMapel);
        const result = await supertest(web).delete('/api/mapel/' + testMapel.id).set("Authorization" , "27d8b5eb-1325-43f4-9f94-0a8f11fa8850");

        expect(result.status).toBe(200);
        expect(result.body.data).toBe("OK");
    })
})

describe('GET /api/mapel/' , ()=>{
    it("should search with filter nama " ,async()=>{
        const result = await supertest(web).get('/api/mapel').query({nama : "Algoritma"});

        console.log(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(1);
        expect(result.body.paging.page).toBe(1);
        expect(result.body.paging.total_page).toBe(1);
        expect(result.body.paging.total_item).toBe(1);
    });

    it("should search with filter nama guru " ,async()=>{
        const result = await supertest(web).get('/api/mapel').query({guru : "haji dwi"});

        console.log(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(2);
        expect(result.body.paging.page).toBe(1);
        expect(result.body.paging.total_page).toBe(1);
        expect(result.body.paging.total_item).toBe(2);
    })
})