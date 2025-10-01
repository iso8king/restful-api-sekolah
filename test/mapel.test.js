import supertest from "supertest";
import { removeTestMapel } from "./test-util.js";
import { web } from "../src/application/web.js";

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
})