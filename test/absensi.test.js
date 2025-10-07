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

describe('POST /api/absensi/:mapelId' , ()=>{
    it("should can get data", async()=> {
        const result = await supertest(web).post('/api/absensi/4').set('Authorization' , "27d8b5eb-1325-43f4-9f94-0a8f11fa8850").send({
            tanggal : "2025-10-04"
        });
        console.log(result.body)

        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
    })

    it("should can get data with siswa id", async()=> {
        const result = await supertest(web).post('/api/absensi/4').set('Authorization' , "27d8b5eb-1325-43f4-9f94-0a8f11fa8850").send({
            tanggal : "2025-10-04",
            siswa_id : "4"
        });
        console.log(result.body)

        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
    })
})

describe('PATCH /api/absensi/:mapelId' , ()=> {
    it("can update status in multiple siswa" , async()=>{
         const result = await supertest(web).patch('/api/absensi/4').set('Authorization' , "27d8b5eb-1325-43f4-9f94-0a8f11fa8850").send({
            tanggal : "2025-10-04",
            status : "izin",
            siswa_id : [3,4]
        });

        console.log(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
    })
})

describe('DELETE /api/absensi/:mapelId' , ()=>{
    it('should delete one absensi' , async()=>{
        const result = await supertest(web).delete('/api/absensi/14').set("Authorization" , "27d8b5eb-1325-43f4-9f94-0a8f11fa8850").send({
            tanggal : "2025-10-04",
            siswa_id : [3]
        });

        expect(result.status).toBe(200);
        expect(result.body.data).toBe("OK");
    })

    it('should delete 3 absensi' , async()=>{
        const result = await supertest(web).delete('/api/absensi/14').set("Authorization" , "27d8b5eb-1325-43f4-9f94-0a8f11fa8850").send({
            tanggal : "2025-10-06",
            siswa_id : [3,4]
        });

        expect(result.status).toBe(200);
        expect(result.body.data).toBe("OK");
    })
})