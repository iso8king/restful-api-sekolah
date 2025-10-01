import mapelService from "../service/mapel-service.js";

const create = async(req,res,next) => {
    try {
        const user = req.user;
        const guruId = req.user.guru.id;
        const request = req.body;

        const result = await mapelService.create(guruId , request);
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
        const result = await mapelService.get(mapelId);
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

        const result = await mapelService.update(mapelId , request);
        res.status(200).json({
            data : result
        })
        
    } catch (e) {
       next(e) 
    }
}

const remove = async (req,res,next) => {
    const mapelId = req.params.mapelId;

    const result = await mapelService.remove(mapelId);

    res.status(200).json({
        data : "OK"
    });
}

export default {
    create,get,update,remove
}