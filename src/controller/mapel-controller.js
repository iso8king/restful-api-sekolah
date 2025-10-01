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

export default {
    create
}