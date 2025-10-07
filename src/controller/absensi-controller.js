import absensiService from "../service/absensi-service.js";

const create = async(req,res,next)=> {
    try {
        const request = req.body;
        const result = await absensiService.create(request);
        res.status(200).json({
            data : result
        })
        
    } catch (e) {
        next(e)     
    }
}

const get = async(req,res,next)=>{
    try {
        const mapelId = req.params.mapelId;
        const request = req.body;

        const result = await absensiService.get(request , mapelId);
        res.status(200).json({
            data : result
        })
        
    } catch (e) {
    next(e)       
    }
}

const update = async(req,res,next)=>{
    try {
        const request = req.body;
        const mapelId = req.params.mapelId;
        
        const result = await absensiService.update(request , mapelId);
        res.status(200).json({
            data : result
        })
        
    } catch (e) {
        next(e)       
    }
}

const remove = async(req,res,next)=>{
    try {
        const request = req.body;
        const mapelId = req.params.mapelId;

        const result = await absensiService.remove(request,mapelId);
        res.status(200).json({
            data : "OK"
        })
    } catch (e) {
        next(e)    
    }
}

export default {
    create,get,update,remove
}