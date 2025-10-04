import supertest from "supertest";
import { web } from "../src/application/web.js";

describe('POST /api/absensi' , ()=> {
    it('should have create absensi' , async()=>{
         const result = await supertest(web).post('/api/absensi').set("Authorization" , "27d8b5eb-1325-43f4-9f94-0a8f11fa8850").send({
            mapel_id : 4,
            tanggal : "2025-10-04",
            data : [
                {
                    siswa_id : 3,
                    status : "hadir"
                },
                {
                    siswa_id : 4,
                    status : "alfa"
                }
            ]
         });
         console.log(result.body);

         expect(result.status).toBe(200);
         
    })
})